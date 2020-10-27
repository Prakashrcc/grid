public with sharing class LandscapeHelper {
    public LandscapeHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static Map<String, Map<String,Decimal>> getLandscapeValues(String accountId){

        Account account = getAccountCurrencyIsoCode(accountId);
        Map<String,CurrencyType> currencyMap = getAllCurrencyExchangerates();

        String query = 'Select Name,dFarm__LineOfBusiness__c , dFarm__PrimaryOffering__c,CurrencyIsoCode, Amount ,Probability, dFarm__StartMonth__c, dFarm__EndMonth__c ,StageName from Opportunity  where  dFarm__IsConverted__c != null';
        List<Opportunity> opportunityList = new List<Opportunity>();
        opportunityList = Database.query(query);
        Map<String, Map<String,Decimal>> umap = new Map<String, Map<String,Decimal>>();
        for(Opportunity oppo : opportunityList){
            System.debug(oppo);
            String key =(String) oppo.dFarm__LineOfBusiness__c + (String)oppo.dFarm__PrimaryOffering__c;
            Decimal winsTotal = 0;
            Decimal pipelineTotal = 0;
            Decimal lossesTotal = 0;
            Decimal opportunityCount = 1;

            oppo.Amount = convertCurrencyToCurrencyExchangerates((Decimal)oppo.Amount , currencyMap , (String)oppo.CurrencyIsoCode , account.CurrencyIsoCode );

            if(oppo.StageName == 'Closed Won'){    
                winsTotal += (((Decimal)oppo.Amount)*((Decimal)oppo.probability))/100;
            }
            else if(oppo.StageName == 'Closed Lost'){
                lossesTotal += (Decimal)oppo.Amount;
            }
            else{
                pipelineTotal += (((Decimal)oppo.Amount)*((Decimal)oppo.probability))/100;
            }

            if(umap.containsKey(key)){
                Map<String, Decimal> eachMap = umap.get(key);
                winsTotal += eachMap.get('winsTotal');
                eachMap.put('winsTotal', winsTotal);
                pipelineTotal += eachMap.get('pipelineTotal');
                eachMap.put('pipelineTotal', pipelineTotal);
                lossesTotal += eachMap.get('lossesTotal');
                eachMap.put('lossesTotal', lossesTotal);
                opportunityCount += eachMap.get('opportunityCount');
                eachMap.put('opportunityCount', opportunityCount);
                umap.put(key, eachMap);
            }
            else{
                Map<String, Decimal> eachMap = new Map<String, Decimal>();
                eachMap.put('winsTotal', winsTotal); 
                eachMap.put('pipelineTotal', pipelineTotal); 
                eachMap.put('lossesTotal', lossesTotal);
                eachMap.put('opportunityCount', opportunityCount);
                umap.put(key, eachMap);
            }

           // System.debug(oppo.dFarm__LineOfBusiness__c.Name);
        }
         
        System.debug(umap);
        return umap;
    }

    @AuraEnabled(cacheable=true)
    public static Account getAccountCurrencyIsoCode(String id){
        String query = 'Select Name, CurrencyIsoCode from Account where Id =:id';
        Account account = Database.query(query);
        return account;
    }

    public static Map<String,CurrencyType> getAllCurrencyExchangerates(){
        Map<String,CurrencyType> currencyMap =new Map<String,CurrencyType>();
        String query = 'select Id, IsCorporate, IsoCode, ConversionRate, DecimalPlaces from CurrencyType where IsActive=true';
        List<CurrencyType> currencies = Database.query(query);
        for (CurrencyType cur : currencies) {
            currencyMap.put(cur.IsoCode, cur);
        }
        return currencyMap;
    }

    public static Decimal convertCurrencyToCurrencyExchangerates(Decimal amount, Map<String,CurrencyType> currencyMap, String amountIsoCode, String accountCurrencyIsoCode){
        CurrencyType currencyType= currencyMap.get(amountIsoCode);
        Decimal conversionRate = (Decimal) currencyType.ConversionRate;
        amount = (amount / conversionRate);
        currencyType = currencyMap.get(accountCurrencyIsoCode);
        conversionRate = (Decimal) currencyType.ConversionRate;
        amount = amount * conversionRate;
        return amount;
    }
    
}
