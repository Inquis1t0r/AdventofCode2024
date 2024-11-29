export default function solveDay1Part1() {
    const input = [1, 2, 3, 4, 5];
    const result = input.reduce((sum, num) => sum + num, 0);
    return `Day 1 Part 1 Result: The sum of the numbers is ${result}`;
}
