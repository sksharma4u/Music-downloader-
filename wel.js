class General {
    constructor(num) {
        this.num = num;
    }

    fact() {
        var f = 1;
        for (let i = 1; i <= this.num; i++) {
            f = f * i;
        }
        return f;
    }
}

var g = new General(5);
console.log(g.fact());