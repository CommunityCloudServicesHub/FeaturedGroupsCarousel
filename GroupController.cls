public with sharing class GroupController {
   @AuraEnabled
   public static List<CollaborationGroup> getGroups() {
       return [SELECT Description, Id, Name, NetworkId, SmallPhotoUrl, FullPhotoUrl 
       		   FROM CollaborationGroup
       		   LIMIT 20];
   }
}