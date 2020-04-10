import * as fs from "fs";
import * as path from "path";
import { Core, PluginManager } from "@webfaas/webfaas-core";
import { Config } from "@webfaas/webfaas-core/lib/Config/Config";
import { IWebFaaSCommandData } from "./IWebFaaSCommandData";

export class WebFaaS {
    private config: Config | null = null;
    private core: Core | null = null;
    private pluginManager: PluginManager | null = null;
    private pathConfigFile: string = "";

    /**
     * return WebFaaS - Config
     */
    getConfig(): Config{
        if (!this.config){
            if (!this.pathConfigFile){
                this.pathConfigFile = this.searchConfigFile();
            }
            let newConfig = new Config(this.pathConfigFile);
            this.setConfig(new Config());
            return newConfig;
        }
        else{
            return this.config;
        }
    }
    /**
     * set config
     * @param config 
     */
    setConfig(config: Config): void{
        this.config = config;
    }


    /**
     * return WebFaaS - Core
     */
    getCore(): Core{
        if (!this.core){
            this.core = new Core(this.getConfig());
        }
        return this.core;
    }

    /**
     * return plugin manager
     */
    getPluginManager(): PluginManager{
        if (!this.pluginManager){
            this.pluginManager = new PluginManager(this.getCore());
            let folderModules = this.searchModulesFolder();
            if (folderModules){
                this.loadPluginsByFolder(folderModules);
            }
        }
        return this.pluginManager;
    }

    /**
     * load plugins by folder
     * @param baseFolder 
     */
    loadPluginsByFolder(baseFolder: string): void{
        this.getPluginManager().loadPluginsByFolder(baseFolder);
    }

    convertArgsToCommandData(args: string[]): IWebFaaSCommandData{
        var commandParameter = {} as IWebFaaSCommandData;

        commandParameter.help = false;
        commandParameter.config = "";
        commandParameter.plugins = [];

        for (let i = 0; i < args.length; i++){
            let parameterName = args[i];
            if (parameterName.substring(0,2) === "--"){
                parameterName = parameterName.substring(2);
                switch (parameterName){
                    case "help":
                        commandParameter.help = true;
                        break;
                    case "config":
                        commandParameter.config = args[i + 1].trim();
                        i ++;
                        break;
                    case "plugins":
                        commandParameter.plugins = args[i + 1].trim().split(",");
                        i ++;
                        break;
                    default:
                        commandParameter.help = true;
                }
            }
            else{
                commandParameter.help = true;
            }
        }

        return commandParameter;
    }

    printHelp(){
        console.log("Usage:");
        console.log("  webfaas --help");
        console.log("  webfaas --config [path]");
        console.log("  webfaas --config [path] --plugins [path, ...]");
    }

    searchConfigFile(): string{
        const listFile: Array<string> = [];
        if (process.env["WEBFAAS_CONFIG"]){
            listFile.push(process.env["WEBFAAS_CONFIG"]);
        }
        listFile.push(path.join(process.cwd(), "webfaas.json"));
        listFile.push(path.join(__dirname, "webfaas.json"));

        return this.searchExistFileInArray(listFile);
    }

    searchModulesFolder(): string{
        const listFile: Array<string> = [];
        listFile.push(path.join(process.cwd(), "node_modules"));
        if (require.main){
            listFile.push(...require.main.paths);
        }
        
        return this.searchExistFileInArray(listFile);
    }

    searchExistFileInArray(listFile: Array<string>): string{
        for (let i = 0; i < listFile.length; i++){
            let file = listFile[i];
            if (fs.existsSync(file)){
                return file;
            }
        }
        return "";
    }

    /**
     * configure WebFaaS
     * @param parameter 
     */
    configureByCommandData(commandData: IWebFaaSCommandData){
        this.pathConfigFile = commandData.config;
        
        for (let i = 0; i < commandData.plugins.length; i++){
            let folderPlugin = commandData.plugins[i];
            this.loadPluginsByFolder(folderPlugin);
        }
    }

    /**
     * start
     */
    async start(){
        await this.getPluginManager().start();
    }

    /**
     * stop
     */
    async stop(){
        await this.getPluginManager().stop();
    }
}