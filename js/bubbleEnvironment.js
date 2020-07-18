class Instance{
    constructor(showLog){
        this.data = {};
        this.canvas = $(`<div></div>`);
        this.showLog = showLog;
        $('body').append(this.canvas);
    }

    publishState(state, value){
        this[state] = value;
        this.log('Published state ' + state + ' with value ' + value);
    }

    getState(state){
        return this[state];
    }

    triggerEvent(eventName){
        this.log("Event " + eventName + " was triggered!");
    }
    
    setHeight(height){
        this.log('Element height updated to ' + height + "px.");
    }

    log(message){
        if(this.showLog){
            console.log(message);
        }
    }
}

class Context{
    constructor(showLog){
        this.showLog = showLog;
        this.jQuery =  $;
        this.keys = {};


        let log = (val)=>{this.log(val)};
        this.currentUser = {
            get: (field)=>{
                log("getting " + field + " data.")
            },
            listProperties: ()=>{
                log("listing properties...")
            }
        };
    }

    uploadContent(fileName, contentBase64, callback){
        this.log("upload succeed")
        this.log("File: " + fileName + " Content: " + contentBase64 + "\n");
        let url = "https://" + (Math.random() * 100000000) + "/" + fileName + ".com"; 
        callback(null, url);
    }

    log(message){
        if(this.showLog){
            console.log(message);
        }
    }
}