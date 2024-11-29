public with sharing class AdventOfCodeTaskRunner {
    @AuraEnabled(cacheable=false)
    public static String runTask(Integer day, Integer part) {

        switch on day {
            when 1 {
                return part == 1 ? 'Apex Task for Day 1 Part 1' : 'Apex Task for Day 1 Part 2';
            }
            when 2 {
                return part == 1 ? 'Apex Task for Day 2 Part 1' : 'Apex Task for Day 2 Part 2';
            }
            when else {
                return 'No Apex implementation available for this day/part.';
            }
        }
    }
}
