/* Created by geaxaefell
Unfinished, it may be finished with you help*/
(function (Scratch) {  
    'use strict';  

    if (!Scratch) throw new Error('Scratch API недоступен. Расширение NetWarp невозможно загрузить.');  

    if (!Scratch.extensions.unsandboxed) console.warn("Для быстрой работы рекомендуемый режим без песочницы, всё равно запускаем в песочнице.");

    class NetWarpExtension {  
        constructor() {  
            this.response = null
        }  

        getInfo() {  
            return {  
                id: 'NetWarp',  
                name: 'NetWarp',  
                menuIconURI: "https://raw.githubusercontent.com/official-geaxaefell/NetWarp/511d716b8d7f13bb7eb21c34639a75ee3ae00707/icon.svg",
                color1: '#ffa600',  
                color2: '#ffa600',  
                blocks: [  
                    {  
                        opcode: 'getFile',  
                        blockType: Scratch.BlockType.COMMAND,  
                        text: 'get [url]',  
                        arguments: { url: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://raw.githubusercontent.com/official-geaxaefell/NetWarp/511d716b8d7f13bb7eb21c34639a75ee3ae00707/script.js' } }  
                    },  
                    {  
                        opcode: 'postOn',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'post on [url] with headers [headers] and body [body]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://api.tavily.com/search'
                            },
                            headers: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"Authorization":"Bearer TOKEN","Content-Type":"application/json"}'
                            },
                            body : {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '{"query":"Dashblocks"}'
                            }
                        }
                    },
                    {  
                        opcode: 'putFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'put [url] with headers [headers] and body [body]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            headers: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            body : {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {  
                        opcode: 'patchFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'patch [url] with headers [headers] and body [body]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            headers: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            body : {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {  
                        opcode: 'deleteFile',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete [url] with headers [headers]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            headers: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'getResponse',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'response'
                    },
                    {
                        opcode: 'checkStatus',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'status'
                    } 
                ],  
                menus: {
                    response: {
                        acceptReporters: true,
                        items: ["status code", "JSON"]
                    }
                }
            };  
        }  

        async getFile(args) {
            try{
                URL(args.url)
            }
            catch{
                if (args.url.includes("localhost")){
                    try{
                        URL(`http://${args.url}`)
                        args.url = `http://${args.url}`
                    }
                    catch{
                        this.response = null;
                        return;  
                    }
                }
                else{
                    const parts = args.url.split(".")
                    if (!(parts.length == 4 && parts.map(Number).every(Number.isFinite, port => port >= 0 && port <= 65535))){
                        try{
                            URL(`http://${args.url}`)
                            args.url = `http://${args.url}`
                        }
                        catch{
                            this.response = null;
                            return;  
                        }
                    }
                    args.url = `http://${args.url}`
                }
            }
                try{
                    const response = await fetch(args.url, {
                        method: 'GET'
                    });
                    this.response = response;
                }
                catch (error){
                    if (error instanceof TypeError){
                        try{
                            const response = await fetch("https://en.wikipedia.org/wiki/Main_Page", {
                                method: 'GET'
                            });
                            this.response = 'Some network error...';
                        }
                        catch (error){
                            if (error instanceof TypeError){
                                    this.response = 'No Internet';
                            }
                            else{
                                console.error(error);
                                this.response = 'some error in extension; please report this issue:\nhttps://github.com/official-geaxaefell/FutureGAPI/issues/1\nIf you know JS, you can fix:\nhttps://github.com/official-geaxaefell/NetWarp\nUpload as new project or new ver of NetWarp';
                            }
                        }
                    }
                    else{
                        console.error(error);
                        this.response = 'some error in extension; please report this issue:\nhttps://github.com/official-geaxaefell/FutureGAPI/issues/1\nIf you know JS, you can fix:\nhttps://github.com/official-geaxaefell/NetWarp\nUpload as new project or new ver of NetWarp';

                    }
                }
        } 

        async postOn(args) {
            try{
                URL(args.url)
            }
            catch{
                if (args.url.includes("localhost")){
                    try{
                        URL(`http://${args.url}`)
                        args.url = `http://${args.url}`
                    }
                    catch{
                        this.response = null;
                        return;  
                    }
                }
                else{
                    const parts = args.url.split(".")
                    if (!(parts.length == 4 && parts.map(Number).every(Number.isFinite, port => port >= 0 && port <= 65535))){
                        try{
                            URL(`http://${args.url}`)
                            args.url = `http://${args.url}`
                        }
                        catch{
                            this.response = null;
                            return;  
                        }
                    }
                    args.url = `http://${args.url}`
                }
            }
                try{
                    const response = await fetch(args.url, {
                        method: 'POST',
                        headers: JSON.parse(args.headers),
                        body: args.body
                    });
                    this.response = response;
                }
                catch (error){
                    if (error instanceof TypeError){
                        try{
                            const response = await fetch("https://en.wikipedia.org/wiki/Main_Page", {
                                method: 'GET'
                            });
                            this.response = 'Some network error...';
                        }
                        catch (error){
                            if (error instanceof TypeError){
                                    this.response = 'No Internet';
                            }
                            else{
                                console.error(error);
                                this.response = 'some error in extension; please report this issue:\nhttps://github.com/official-geaxaefell/FutureGAPI/issues/1\nIf you know JS, you can fix:\nhttps://github.com/official-geaxaefell/NetWarp\nUpload as new project or new ver of NetWarp';
                            }
                        }
                    }
                    else{
                        console.error(error);
                        this.response = 'some error in extension; please report this issue:\nhttps://github.com/official-geaxaefell/FutureGAPI/issues/1\nIf you know JS, you can fix:\nhttps://github.com/official-geaxaefell/NetWarp\nUpload as new project or new ver of NetWarp';

                    }
                }
        }
        async putFile(args){
            try{
                URL(args.url)
            }
            catch{
                if (args.url.includes("localhost")){
                    try{
                        URL(`http://${args.url}`)
                        args.url = `http://${args.url}`
                    }
                    catch{
                        this.response = null;
                        return;  
                    }
                }
                else{
                    const parts = args.url.split(".")
                    if (!(parts.length == 4 && parts.map(Number).every(Number.isFinite, port => port >= 0 && port <= 65535))){
                        try{
                            URL(`http://${args.url}`)
                            args.url = `http://${args.url}`
                        }
                        catch{
                            this.response = null;
                            return;  
                        }
                    }
                    args.url = `http://${args.url}`
                }
            }
                try{
                    const response = await fetch(args.url, {
                        method: 'PUT',
                        headers: JSON.parse(args.headers),
                        body: args.body
                    });
                    this.response = response;
                }
                catch (error){
                    if (error instanceof TypeError){
                        try{
                            const response = await fetch("https://en.wikipedia.org/wiki/Main_Page", {
                                method: 'GET'
                            });
                            this.response = 'Some network error...';
                        }
                        catch (error){
                            if (error instanceof TypeError){
                                    this.response = 'No Internet';
                            }
                            else{
                                console.error(error);
                                this.response = 'some error in extension; please report this issue:\nhttps://github.com/official-geaxaefell/FutureGAPI/issues/1\nIf you know JS, you can fix:\nhttps://github.com/official-geaxaefell/NetWarp\nUpload as new project or new ver of NetWarp';
                            }
                        }
                    }
                    else{
                        console.error(error);
                        this.response = 'some error in extension; please report this issue:\nhttps://github.com/official-geaxaefell/FutureGAPI/issues/1\nIf you know JS, you can fix:\nhttps://github.com/official-geaxaefell/NetWarp\nUpload as new project or new ver of NetWarp';

                    }
                }
        }
        async getResponse(){
            if (this.response instanceof Response){
                const response = await this.response.text();
                return response;
            }
            else{
                return this.response;
            }
        }
        checkStatus(){
            if (this.response instanceof Response){
                const response = `${this.response.status} ${this.response.statusText}`;
                return response;
            }
            else{
                return this.response;
            }
        }
    }  
 
    Scratch.extensions.register(new NetWarpExtension());  
})(Scratch);  
