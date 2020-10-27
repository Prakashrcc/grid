import { LightningElement, wire, api } from 'lwc';
import getSObjectRecords from '@salesforce/apex/RecordHelper.getSObjectRecords';
import getLandscapeValues from '@salesforce/apex/LandscapeHelper.getLandscapeValues';
import getAccountCurrencyIsoCode from '@salesforce/apex/LandscapeHelper.getAccountCurrencyIsoCode';

export default class Grid extends LightningElement {
  
  offeringList = [];
  buyingList = [];
  greeting = 'World';
  landscapeValues;
  accountCurrencyIsoCode;
  @api accountCurrencySymbol;

  @wire(getSObjectRecords , { objectName: 'dFarm__Offering__c'})
  wiredGetOfferingRecordsMethod({ error, data }){
    if(data){
      console.log(data);
      this.offeringList = data;
      console.log(this.offeringList);
      
      
    }
    else if(error){
      this.error = error;
      console.error(error);
    }
  }
  @wire(getSObjectRecords , { objectName: 'dFarm__LineOfBusiness__c'})
  wiredGetBuyingCentreRecordsMethod({ error, data }){
    if(data){
      console.log(data);
      this.buyingList = data;
      console.log(this.buyingList);
    }
    else if(error){
      this.error = error;
      console.error(error);
    }
  }
  @wire(getLandscapeValues , { accountId: '0012w00000PQyUnAAL'})
  wiredGetLandscapeValuesMethod({ error, data }){
    if(data){
      console.log(data);
      this.landscapeValues = data;
      console.log(this.landscapeValues['a0f2w000000D8tdAACa0j2w000000Q6EXAA0']);
      
    }
    else if(error){
      this.error = error;
      console.error(error);
    }
  }

  @wire(getAccountCurrencyIsoCode , { id: '0012w00000PQyUnAAL' })
  wiredGetAccountCurrencyIsoCodeMethod({ error , data }){
    if(data){
      this.accountCurrencyIsoCode = data.CurrencyIsoCode;
      this.currencyCodeToCurrencySign(this.accountCurrencyIsoCode);

      console.log(this.accountCurrencySymbol);
    }
    else if(error){
      this.error = error;
      console.error(error);
    }
  }
  connectedCallback(){
    
  }
  renderedCallback(){
    this.sizeChanger();
    //this.landscapeMapper();
   // this.currencyCodeToCurrencySign(this.accountCurrencyIsoCode);
    //console.log(this.accountCurrencySymbol);
   
    
  }
  
  changeHandler(event) {
    this.greeting = event.target.value;
  }
  
  sizeChanger(){
    this.container = this.template.querySelector('[data-id="container"]');
    if(this.offeringList.length == 1 && this.buyingList.length == 1){
      this.container.style.zoom = "1.9";
      this.template.querySelector('[data-id="header"]').style.width = "55%";
      this.template.querySelector('[data-id="card-container"]').style.marginLeft = "10%";
      this.template.querySelector('[data-id="left-container"]').style.paddingTop = "15% ";
    }
    else if(this.offeringList.length == 2 || this.buyingList.length == 2){
      this.container.style.zoom = "1.2";
      this.template.querySelector('[data-id="header"]').style.width = "55%";
      this.template.querySelector('[data-id="left-container"]').style.paddingTop = "10% ";
      
    }
    else if(this.offeringList.length == 3 || this.buyingList.length == 3){
      this.container.style.zoom = "1.2";
      this.template.querySelector('[data-id="header"]').style.width = "55%";
    }
  }

  currencyCodeToCurrencySign(accountCurrencyIsoCode){
    var allCurrencyMap ={
      'AED': 'د.إ',
      'AFN': '؋',
      'ALL': 'L',
      'AMD': '֏',
      'ANG': 'ƒ',
      'AOA': 'Kz',
      'ARS': '$',
      'AUD': '$',
      'AWG': 'ƒ',
      'AZN': '₼',
      'BAM': 'KM',
      'BBD': '$',
      'BDT': '৳',
      'BGN': 'лв',
      'BHD': '.د.ب',
      'BIF': 'FBu',
      'BMD': '$',
      'BND': '$',
      'BOB': '$b',
      'BRL': 'R$',
      'BSD': '$',
      'BTC': '฿',
      'BTN': 'Nu.',
      'BWP': 'P',
      'BYR': 'Br',
      'BYN': 'Br',
      'BZD': 'BZ$',
      'CAD': '$',
      'CDF': 'FC',
      'CHF': 'CHF',
      'CLP': '$',
      'CNY': '¥',
      'COP': '$',
      'CRC': '₡',
      'CUC': '$',
      'CUP': '₱',
      'CVE': '$',
      'CZK': 'Kč',
      'DJF': 'Fdj',
      'DKK': 'kr',
      'DOP': 'RD$',
      'DZD': 'دج',
      'EEK': 'kr',
      'EGP': '£',
      'ERN': 'Nfk',
      'ETB': 'Br',
      'ETH': 'Ξ',
      'EUR': '€',
      'FJD': '$',
      'FKP': '£',
      'GBP': '£',
      'GEL': '₾',
      'GGP': '£',
      'GHC': '₵',
      'GHS': 'GH₵',
      'GIP': '£',
      'GMD': 'D',
      'GNF': 'FG',
      'GTQ': 'Q',
      'GYD': '$',
      'HKD': '$',
      'HNL': 'L',
      'HRK': 'kn',
      'HTG': 'G',
      'HUF': 'Ft',
      'IDR': 'Rp',
      'ILS': '₪',
      'IMP': '£',
      'INR': '₹',
      'IQD': 'ع.د',
      'IRR': '﷼',
      'ISK': 'kr',
      'JEP': '£',
      'JMD': 'J$',
      'JOD': 'JD',
      'JPY': '¥',
      'KES': 'KSh',
      'KGS': 'лв',
      'KHR': '៛',
      'KMF': 'CF',
      'KPW': '₩',
      'KRW': '₩',
      'KWD': 'KD',
      'KYD': '$',
      'KZT': 'лв',
      'LAK': '₭',
      'LBP': '£',
      'LKR': '₨',
      'LRD': '$',
      'LSL': 'M',
      'LTC': 'Ł',
      'LTL': 'Lt',
      'LVL': 'Ls',
      'LYD': 'LD',
      'MAD': 'MAD',
      'MDL': 'lei',
      'MGA': 'Ar',
      'MKD': 'ден',
      'MMK': 'K',
      'MNT': '₮',
      'MOP': 'MOP$',
      'MRO': 'UM',
      'MRU': 'UM',
      'MUR': '₨',
      'MVR': 'Rf',
      'MWK': 'MK',
      'MXN': '$',
      'MYR': 'RM',
      'MZN': 'MT',
      'NAD': '$',
      'NGN': '₦',
      'NIO': 'C$',
      'NOK': 'kr',
      'NPR': '₨',
      'NZD': '$',
      'OMR': '﷼',
      'PAB': 'B/.',
      'PEN': 'S/.',
      'PGK': 'K',
      'PHP': '₱',
      'PKR': '₨',
      'PLN': 'zł',
      'PYG': 'Gs',
      'QAR': '﷼',
      'RMB': '￥',
      'RON': 'lei',
      'RSD': 'Дин.',
      'RUB': '₽',
      'RWF': 'R₣',
      'SAR': '﷼',
      'SBD': '$',
      'SCR': '₨',
      'SDG': 'ج.س.',
      'SEK': 'kr',
      'SGD': '$',
      'SHP': '£',
      'SLL': 'Le',
      'SOS': 'S',
      'SRD': '$',
      'SSP': '£',
      'STD': 'Db',
      'STN': 'Db',
      'SVC': '$',
      'SYP': '£',
      'SZL': 'E',
      'THB': '฿',
      'TJS': 'SM',
      'TMT': 'T',
      'TND': 'د.ت',
      'TOP': 'T$',
      'TRL': '₤',
      'TRY': '₺',
      'TTD': 'TT$',
      'TVD': '$',
      'TWD': 'NT$',
      'TZS': 'TSh',
      'UAH': '₴',
      'UGX': 'USh',
      'USD': '$',
      'UYU': '$U',
      'UZS': 'лв',
      'VEF': 'Bs',
      'VND': '₫',
      'VUV': 'VT',
      'WST': 'WS$',
      'XAF': 'FCFA',
      'XBT': 'Ƀ',
      'XCD': '$',
      'XOF': 'CFA',
      'XPF': '₣',
      'YER': '﷼',
      'ZAR': 'R',
      'ZWD': 'Z$'
    };
    
    this.accountCurrencySymbol = allCurrencyMap[accountCurrencyIsoCode];
    console.log(this.accountCurrencySymbol);
  }
}