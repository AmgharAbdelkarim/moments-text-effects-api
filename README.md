# moments-text-effects-api


# REST API

### Request

`POST /text-effects`

    curl --location 'http://localhost:3000/text-effects' \
    --header 'Content-Type: application/json' \
    --data '{
    "inputVideoPath": "test_input1.mp4",
    "duration": "60",
    "resolution": "1920 x 1080",
    "outputVideoPath": "test_output1.mp4",
    "text": "I’m sOoOo good at this game! xD",
    "coordinate": {"x" : 200 , "y": 100},
    "startTime": "23",
    "fontSize" : "64",
    "fontColor":"0xFFFFFF",
    "endTime": "60"
     }'
     
# Usage

```python
npm install
npm start
```
 
