import * as fs from "fs";
import * as path from "path";
import { Core, PluginManager } from "@webfaas/webfaas-core";
import { Config } from "@webfaas/webfaas-core/lib/Config/Config";

export class WebFaaS {
    private config: Config | null = null;
    private core: Core | null = null;
    private pluginManager: PluginManager | null = null;
    private pathConfigFile: string | null = null;
    private pathNodeModulesDirectory: string | null = null;
    private pathRootPackageDirectory: string | null = null;
    private pathCurrentWorkingDirectory: string | null = null;
    private started: boolean = false;

    getStarted(): boolean{
        return this.started;
    }
    
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
        }
        return this.pluginManager;
    }

    /**
     * scan and load plugins
     */
    scanAndLoadPlugins(): void{
        let folder = this.getPathNodeModulesDirectory();
        if (folder){
            this.loadPluginsByFolder(folder);
        }
    }

    /**
     * load plugins by folder
     * @param baseFolder 
     */
    loadPluginsByFolder(baseFolder: string): void{
        this.getPluginManager().loadPluginsByFolder(baseFolder);
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
     * start
     */
    async start(){
        if (this.started === false){
            const config = this.getConfig();
            this.getCore().getPackageRegistryManager().setDefaultRegistryName(config.get("registry.default", "npm"));
            
            await this.getPluginManager().start();
    
            this.started = true;
        }
    }

    /**
     * stop
     */
    async stop(){
        if (this.started){
            await this.getPluginManager().stop();
            this.started = false;
        }
    }
}

export { Core } from "@webfaas/webfaas-core";