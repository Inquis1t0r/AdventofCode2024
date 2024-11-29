export default function solveDay1Part2() {
    const input = [1, 2, 3, 4, 5];
    const result = input.reduce((product, num) => product * num, 1);
    return `Day 1 Part 2 Result: The product of the numbers is ${result}`;
}
