import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { CloseActionScreenEvent } from 'lightning/actions';
import { createRecord } from 'lightning/uiRecordApi';

export default class CustomerDocumentationCmp extends LightningElement {
    @api recordId;

    cdName;
    cdDate;
    cdReferal;
    cdDescription;


    handleNameChange(event) {
        this.cdName = event.target.value;
    }

    handleDate(event){
        this.cdDate - event.target.value
    }

    handleRef(event){
        this.cdReferal - event.target.value
    }
    handleDesc(event){
        this.cdDescription - event.target.value
    }

    async createCd() {
        const fields = {Name: this.cdName, ActivityDate__c: this.cdDate, IsReferralAsked__c: this.cdReferal, PrimaryAccountId__c: this.recordId};
        const recordInput = { apiName: 'CustomerDocumentation__c' , fields };
        try{
            await createRecord(recordInput);
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Client Documentation created',
                    variant: 'success'
                })
            );
          this.dispatchEvent(new CloseActionScreenEvent());
        }catch(error){
            console.log(' error *** ',  error );
        }

    }
}