function reverseString(str) {
    const strArr = str.split('');

    strArr.pop();

    return strArr.reverse().join('');
}
process.stdin.on('data', (data) => {
    process.stdout.write(reverseString(data.toString()) + '\n\n');
});