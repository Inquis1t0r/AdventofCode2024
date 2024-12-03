import { LightningElement, track } from 'lwc';
import runApexTask from '@salesforce/apex/AdventOfCodeTaskRunner.runTask';

import solveDay1Part1 from './tasks/day1Part1';
import solveDay1Part2 from './tasks/day1Part2';
import solveDay2Part1 from './tasks/day2Part1';
import solveDay2Part2 from './tasks/day2Part2';
import solveDay3Part1 from './tasks/day3Part1';
import solveDay3Part2 from './tasks/day3Part2';

export default class AdventTaskSelector extends LightningElement {
    @track selectedDay = '';
    @track selectedPart = '';
    @track selectedExecutionType = 'JS';
    @track result = null;

    get executionTypeIcon() {
        return this.selectedExecutionType === 'JS' ? 'utility:code' : 'utility:cloud';
    }
    
    get executionTypeLabel() {
        return this.selectedExecutionType === 'JS' ? 'JavaScript' : 'Apex';
    }
    

    daysOptions = Array.from({ length: 25 }, (_, i) => ({
        label: `Day ${i + 1}`,
        value: String(i + 1)
    }));

    partOptions = [
        { label: 'Part 1', value: '1' },
        { label: 'Part 2', value: '2' }
    ];

    handleDayChange(event) {
        this.selectedDay = event.detail.value;
        this.result = null;
    }

    handlePartChange(event) {
        this.selectedPart = event.detail.value;
        this.result = null;
    }

    toggleExecutionType() {
        this.selectedExecutionType = this.selectedExecutionType === 'JS' ? 'Apex' : 'JS';
        this.result = null;
    }

    async runTask() {
        if (!this.selectedDay || !this.selectedPart) {
            this.result = 'Please select both a day and a part.';
            return;
        }

        try {
            if (this.selectedExecutionType === 'JS') {
                const taskCode = this.getTaskCode(this.selectedDay, this.selectedPart);
                if (typeof taskCode === 'function') {
                    this.result = taskCode();
                } else {
                    this.result = 'No JavaScript implementation available for this day/part.';
                }
            } else {
                const apexResult = await runApexTask({
                    day: this.selectedDay,
                    part: this.selectedPart
                });
                this.result = apexResult;
            }
        } catch (error) {
            console.error(error);
            this.result = 'An error occurred while running the task.';
        }
    }

    getTaskCode(day, part) {
        const tasks = {
            1: { 1: solveDay1Part1, 2: solveDay1Part2 },
            2: { 1: solveDay2Part1, 2: solveDay2Part2 },
            3: { 1: solveDay3Part1, 2: solveDay3Part2 },
        };

        return tasks[day]?.[part] || null;
    }
}
