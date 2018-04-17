namespace Utilities {
    export var unionSets = function (setA, setB): Set<any> {
        let union = new Set();
        setA.forEach(element => {
            union.add(element);
        });

        setB.forEach(element => {
            union.add(element);
        });

        return union;
    }

    export var setToArray = function (set: Set<any>) {
        var arr = [];
        set.forEach(element => {
            arr.push(element);
        });

        return arr;
    }
}

export default Utilities;