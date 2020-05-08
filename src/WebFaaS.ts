import * as fs from "fs";
import * as path from "path";
import { Core, PluginManager } from "@webfaas/webfaas-core";
import { Config } from "@webfaas/webfaas-core/lib/Config/Config";
import { IWebFaaSCommandData } from "./IWebFaaSCommandData";

export class WebFaaS {
    private config: Config | null = null;
    private core: Core | null = null;
    private pluginManager: PluginManager | null = null;
    private pathConfigFile: string | null = null;
    private pathNodeModulesDirectory: string | null = null;
    private pathRootPackageDirectory: string | null = null;
    private pathCurrentWorkingDirectory: string | null = null;
    
    /**
     * return WebFaaS - Config
     */
    getConfig(): Config{
        if (!this.config){
            let newConfig = new Config();
            newConfig.read(this.getPathConfigFile());
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
     * return cwd
     */
    getPathCurrentWorkingDirectory(): string{
        if (this.pathCurrentWorkingDirectory === null){
            this.setPathCurrentWorkingDirectory(process.cwd());
            return process.cwd();
        }
        else{
            return this.pathCurrentWorkingDirectory;
        }

    }
    /**
     * set cwd
     * @param value cwd
     */
    setPathCurrentWorkingDirectory(value: string): void{
        this.pathCurrentWorkingDirectory = value;
    }

    /**
     * return path config files
     */
    getPathConfigFile(): string{
        if (this.pathConfigFile === null){
            let newPathConfigFile = this.searchConfigFile();
            this.setPathConfigFile(newPathConfigFile);
            return newPathConfigFile;
        }
        else{
            return this.pathConfigFile;
        }
    }
    /**
     * set path config files
     * @param value path config files
     */
    setPathConfigFile(value: string): void{
        this.pathConfigFile = value;
    }

    /**
     * return path node modules directory
     */
    getPathNodeModulesDirectory(): string{
        if (this.pathNodeModulesDirectory === null){
            let newPathNodeModulesDirectory = this.searchNodeModulesDirectory();
            this.setPathNodeModulesDirectory(newPathNodeModulesDirectory);
            return newPathNodeModulesDirectory;
        }
        else{
            return this.pathNodeModulesDirectory;
        }
    }
    /**
     * set path node_modules directory
     * @param value path node modules
     */
    setPathNodeModulesDirectory(value: string): void{
        this.pathNodeModulesDirectory = value;
    }

    /**
     * return path root package directory
     */
    getPathRootPackageDirectory(): string{
        if (this.pathRootPackageDirectory === null){
            let newPathRootPackageDirectory = this.searchRootPackageDirectory();
            this.setPathRootPackageDirectory(newPathRootPackageDirectory);
            return newPathRootPackageDirectory;
        }
        else{
            return this.pathRootPackageDirectory;
        }
    }
    /**
     * set path root package directory
     * @param value path node modules
     */
    setPathRootPackageDirectory(value: string): void{
        this.pathRootPackageDirectory = value;
    }

    /**
     * return plugin manager
     */
    getPluginManager(): PluginManager{
        if (!this.pluginManager){
            this.pluginManager = new PluginManager(this.getCore());
            if (this.getPathNodeModulesDirectory()){
                this.loadPluginsByFolder(this.getPathNodeModulesDirectory());
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

    /**
     * convert args to command data
     * @param args 
     */
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

    /**
     * print help
     */
    printHelp(){
        console.log("Usage:");
        console.log("  webfaas --help");
        console.log("  webfaas --config [path]");
        console.log("  webfaas --config [path] --plugins [path, ...]");
    }

    /**
     * search config file
     */
    private searchConfigFile(): string{
        const listFile: Array<string> = [];
        if (process.env["WEBFAAS_CONFIG"]){
            listFile.push(process.env["WEBFAAS_CONFIG"]);
        }
        listFile.push(path.join(this.getPathCurrentWorkingDirectory(), "webfaas.json"));
        listFile.push(path.join(__dirname, "webfaas.json"));

        return this.searchExistFileInArray(listFile);
    }

    /**
     * search node modules directory
     */
    private searchNodeModulesDirectory(): string{
        const listFile: Array<string> = [];
        listFile.push(path.join(this.getPathCurrentWorkingDirectory(), "node_modules"));
        if (require.main){
            listFile.push(...require.main.paths);
        }
        
        return this.searchExistFileInArray(listFile);
    }

    /**
     * search root package directory
     */
    private searchRootPackageDirectory(): string{
        if (this.searchExistFileInArray([path.join(this.getPathCurrentWorkingDirectory(), "package.json")])){
            return this.getPathCurrentWorkingDirectory();
        }
        else{
            return "";
        }
    }

    /**
     * search exist file in array
     * @param listFile 
     */
    private searchExistFileInArray(listFile: Array<string>): string{
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
        if (commandData.config){
            this.setPathConfigFile(commandData.config);
        }
        
        for (let i = 0; i < commandData.plugins.length; i++){
            let folderPlugin = commandData.plugins[i];
            this.loadPluginsByFolder(folderPlugin);
        }

        let rootPackageDirectory = this.getPathRootPackageDirectory();
        
        if (rootPackageDirectory && (rootPackageDirectory.substr(-8) !== (path.sep + "webfaas"))){ //ignore webfaas module
            this.getCore().getModuleManager().getModuleManagerCache().addLocalDiskModuleToCache(rootPackageDirectory);
        }
    }

    /**
     * start
     */
    async start(){
        const config = this.getConfig();
        this.getCore().getPackageRegistryManager().setDefaultRegistryName(config.get("registry.default", "npm"));
        
        await this.getPluginManager().start();
    }

    /**
     * stop
     */
    async stop(){
        await this.getPluginManager().stop();
    }
}