public with sharing class RecordHelper {
    public RecordHelper() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Map<String,String>> getSObjectRecords(String objectName) {
        
        String query = ' SELECT Name,Id, count(CreatedById)c from '+objectName +' group by Name,Id';
        List<AggregateResult> aggregateResultList = new List<AggregateResult>();
        aggregateResultList =(List<AggregateResult>) Database.query(query);
       List< Map<String, String>> nameList = new List<Map< String,String>>();
        for(AggregateResult aggregateResult : aggregateResultList){
            Map<String,String> eachMap = new Map<String,String>();
            eachMap.put('key',(String) aggregateResult.get('Id') );
            eachMap.put('name',(String) aggregateResult.get('Name'));
            nameList.add(eachMap);
        }
        return nameList; 
    }
}
