const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const generateFFmpegCMD = ({
    inputVideoPath,
    outputVideoPath,
    text,
    coordinate,
    fontSize,
    fontColor,
    startTime,
    endTime,
}) => {
    const { x, y } = coordinate;
    const result = `ffmpeg -i ${inputVideoPath} -vf drawtext="enable='between(t,${parseFloat(
        startTime
    )},${parseFloat(
        endTime
    )})':text='${text}'${fontColor ? `:fontcolor=${fontColor}` : ""}${fontSize ? `:fontsize=${fontSize}` : ""}:x=${x}:y=${y}" ${outputVideoPath}`;

    return result;
};

const validator = (req, res, next) => {
    const { body } = req;
    const { duration, resolution, coordinate, startTime, endTime } = body;
    const [x, y] = resolution.split('x');
    const validation = {
        'Invalid X,Y coordinate': x < coordinate.x || y < coordinate.y,
        'Start Time must be less than End Time':
            parseFloat(startTime) > parseFloat(endTime),
        'Invalid start Time': parseFloat(startTime) > parseFloat(duration),
        'Invalid End Time': parseFloat(endTime) > parseFloat(duration),
    };
    for (let errorMessage in validation) {
        if (validation[errorMessage]) {
            const resBody = {
                status: 'ERROR',
                error: errorMessage,
            };
            console.log(resBody);
            res.status(400).send(resBody);
            return;
        }
    }
    next();
};

const handleRequest = (req, res) => {
    const { body } = req;
    const result = generateFFmpegCMD(body);
    const resBody = {
        status: 'SUCCESS',
        command: result,
    };
    console.log(resBody);
    res.status(200).send(resBody);
};

app.post('/text-effects', [validator, handleRequest]);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
