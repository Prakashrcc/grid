import { LightningElement , api, track} from 'lwc';
import My_Resource from '@salesforce/resourceUrl/images';

const COUNT_ABBRS = [ '', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y' ];

export default class WhiteSpace extends LightningElement {
    // images
    bulbImgUrl = My_Resource+'/images/bulb/img.png' ;
    starImgUrl = My_Resource+'/images/star/landscape@3x.png';
    taskImgUrl = My_Resource+'/images/task/landscape@3x.png';
    bulleyeImgUrl = My_Resource+'/images/bull-eye/img.png';

    //variables
    @api space='';
    @api pipelineTotal = '0';
    @api winsTotal = '0';
    @api lossesTotal = '0';
    @api targetTotal = '0';
    acheivedPercentage = 0;
    @api competitor = 'false';
    @api strategy = 'false';
    @api task = 'false';
    @api landscapeValues ;
    @api buying;
    @api offering;
    @api sym;
    
    key;
    opportunity;
    
    //Changing it to K,M etc
    pipelineAmount = 0;
    winsAmount = 0;
    lossesAmount = 0;
    targetAmount = 0;
    sign = 'rs';

    renderedCallback(){
        
        this.valueSetter();
        this.pipelineAmount = this.intToString(this.pipelineTotal,2);
        this.winsAmount = this.intToString(this.winsTotal,2);
        this.lossesAmount = this.intToString(this.lossesTotal,2);
        this.targetAmount = this.intToString(this.targetTotal,2);
        this.sign = this.sym;
        console.log(this.sym);
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
    valueSetter(){ 
        this.key = this.buying + this.offering;
        if(this.landscapeValues[this.key] != undefined){
            this.winsTotal = this.landscapeValues[this.key].winsTotal;
            this.lossesTotal = this.landscapeValues[this.key].lossesTotal;
             this.pipelineTotal = this.landscapeValues[this.key].pipelineTotal;
             this.opportunity = 'true';
        }
        else{
            this.opportunity = 'false';
        }
        
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
        if(this.competitor == 'false'){
            this.template.querySelector('[data-id="starImg"]').style.opacity = "10%";
        }
        if(this.opportunity == 'false'){
            this.template.querySelector('[data-id="starImg"]').style.opacity = "0%";
        }
    }
    strategyChecker(){
        if(this.strategy == 'false'){
            this.template.querySelector('[data-id="bulbImg"]').style.opacity = "10%";
        }
        if(this.opportunity == 'false'){
            this.template.querySelector('[data-id="bulbImg"]').style.opacity = "0%";
        }
    }
    taskChecker(){
        if(this.task == 'false'){
            this.template.querySelector('[data-id="taskImg"]').style.opacity = "10%";
        }
        if(this.opportunity == 'false'){
            this.template.querySelector('[data-id="taskImg"]').style.opacity = "0%";
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
        this.percent = ((amount1/amount2)*100);
        if(this.percent > 100){
            this.percent = 100;
        }
        return this.percent;
    } 
}
