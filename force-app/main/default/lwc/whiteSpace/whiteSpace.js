import { LightningElement } from 'lwc';
import My_Resource from '@salesforce/resourceUrl/images';

const COUNT_ABBRS = [ '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y' ];

export default class WhiteSpace extends LightningElement {
    // images
    bulbImgUrl = My_Resource+'/images/bulb/img.png' ;
    starImgUrl = My_Resource+'/images/star/landscape@3x.png';
    taskImgUrl = My_Resource+'/images/task/landscape@3x.png';
    bulleyeImgUrl = My_Resource+'/images/bull-eye/img.png';

    //variables
    space='WHITESPACE';
    pipelineTotal = 800000;
    winsTotal = 600000;
    lossesTotal = 200000;
    targetTotal = 400000;
    acheivedPercentage = 0;
    competitor = true;
    strategy = true;
    task = true;

    //Changing it to K,M etc
    pipelineAmount = this.intToString(this.pipelineTotal,2);
    winsAmount = this.intToString(this.winsTotal,2);
    lossesAmount = this.intToString(this.lossesTotal,2);
    targetAmount = this.intToString(this.targetTotal,2);

    renderedCallback(){
        this.pipelineBarCalculator();
        this.winsBarCalculator();
        this.lossesBarCalculator();
        this.valueElementRemover();
        this.acheivedPercentageCalculator();
        this.targetChecker();
        this.competitorChecker();
        this.strategyChecker();
        this.taskChecker();
        
    }
    pipelineBarCalculator(){
        if(this.pipelineTotal < 1){
            this.pipelineBarElement =this.template.querySelector('[data-id="pipelineBar"]');
            this.pipelineBarElement.style.opacity="10%";
            this.pipelineValueElement = this.template.querySelector('[data-id="pipelineValue"]');
            this.pipelineValueElement.style.color = "#a0a2a4";
            this.pipelineValueElement.innerHTML = '&#8213';
            
        }
    }
    winsBarCalculator(){
        this.winsBarElement = this.template.querySelector('[data-id="winsBar"]');
        this.winsValueElement = this.template.querySelector('[data-id="winsValue"]');
        if(this.winsTotal < 1){
            this.winsBarElement.style.opacity="10%";
            this.winsBarElement.style.background = "#00bd77";
            this.winsValueElement.style.color = "#a0a2a4";
            this.winsValueElement.innerHTML = '&#8213';
        }
        else{
            this.winsBarElement.style.opacity="100%";
            this.winsBarElement.style.background = "#00bd77";
            this.winsBarElement.style.width = this.percentCalculator(this.winsTotal,this.pipelineTotal)+"%";
            this.winsValueElement.style.color = "black";
        }
    }
    lossesBarCalculator(){
        this.lossesBarElement = this.template.querySelector('[data-id="lossesBar"]');
        this.lossesValueElement = this.template.querySelector('[data-id="lossesValue"]');
        if(this.lossesTotal < 1){
            this.lossesBarElement.style.opacity="10%";
            this.lossesBarElement.style.background = "#ff5757";
            this.lossesValueElement.style.color = "#a0a2a4";
            this.lossesValueElement.innerHTML = '&#8213';
        }
        else{
            this.lossesBarElement.style.opacity="100%";
            this.lossesBarElement.style.background = "#ff5757";
            this.lossesBarElement.style.width = this.percentCalculator(this.lossesTotal,this.pipelineTotal)+"%";
            this.lossesValueElement.style.color = "black";
        }
    }
    valueElementRemover(){
        if(this.pipelineTotal <1 && this.winsTotal < 1 && this.lossesTotal < 1){
           this.template.querySelector('[data-id="valueContainer"]').style.opacity = "0"; 
        }
    }
    acheivedPercentageCalculator(){
        if(this.winsTotal < 1 || this.targetTotal < 1){
            this.template.querySelector('[data-id="acheivedPercentage"]').style.opacity = "0";
        }
        else{
            this.acheivedPercentage = ((this.winsTotal / this.targetTotal)*100);
        }  
    }
    targetChecker(){
        if(this.targetTotal < 1){
            this.template.querySelector('[data-id="targetContainer"]').style.opacity = "0";
        }
        else{
            this.targetTag = this.template.querySelector('[data-id="targetTag"]');
            this.targetTag.style.fontSize ="16px";
            this.targetTag.style.marginTop ="-4%";
        }
    }
    competitorChecker(){
        if(this.competitor == false){
            this.template.querySelector('[data-id="starImg"]').style.opacity = "10%";
        }
    }
    strategyChecker(){
        if(this.strategy == false){
            this.template.querySelector('[data-id="bulbImg"]').style.opacity = "10%";
        }
    }
    taskChecker(){
        if(this.task == false){
            this.template.querySelector('[data-id="taskImg"]').style.opacity = "10%";
        }
    }
    intToString(count, withAbbr = false, decimals = 2) {
        const i     = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
        let result  = parseFloat((count / Math.pow(1000, i)).toFixed(decimals));
        if(withAbbr) {
            result += `${COUNT_ABBRS[i]}`; 
        }
        //alert(result);
        return result;
    }
    percentCalculator(amount1,amount2){
        this.percent = ((amount1/amount2)*100)%100;
        return this.percent;
    } 
}
