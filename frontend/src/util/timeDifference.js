const timeDifferences = (time1, time2) => {
    let diff = (time1.getTime() - time2.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
};

export default timeDifferences