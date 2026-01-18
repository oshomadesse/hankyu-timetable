<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>阪急 梅田⇔十三 乗車案内</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif;
            background: linear-gradient(135deg, #7B0F1E 0%, #5A0B16 100%);
            min-height: 100vh;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 25px;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        
        @media (max-width: 480px) {
            body {
                padding: 10px;
                align-items: flex-start;
                padding-top: 20px;
            }
            
            .container {
                padding: 20px;
                border-radius: 15px;
            }
        }
        
        h1 {
            text-align: center;
            color: #7B0F1E;
            margin-bottom: 10px;
            font-size: 24px;
            font-weight: bold;
        }
        
        @media (max-width: 480px) {
            h1 {
                font-size: 20px;
                margin-bottom: 8px;
            }
        }
        
        .subtitle {
            text-align: center;
            color: #666;
            margin-bottom: 30px;
            font-size: 14px;
        }
        
        @media (max-width: 480px) {
            .subtitle {
                font-size: 13px;
                margin-bottom: 20px;
            }
        }
        
        .station-select {
            display: flex;
            gap: 15px;
            margin-bottom: 25px;
        }
        
        @media (max-width: 480px) {
            .station-select {
                gap: 10px;
                margin-bottom: 20px;
            }
        }
        
        .station-btn {
            flex: 1;
            padding: 20px;
            border: 3px solid #ddd;
            border-radius: 15px;
            background: white;
            cursor: pointer;
            transition: all 0.3s;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        
        @media (max-width: 480px) {
            .station-btn {
                padding: 15px;
                font-size: 16px;
                border-radius: 12px;
            }
        }
        
        .station-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .station-btn.selected {
            border-color: #7B0F1E;
            background: #FFF5F6;
            color: #7B0F1E;
        }
        
        .current-time {
            text-align: center;
            font-size: 32px;
            font-weight: bold;
            color: #7B0F1E;
            margin-bottom: 20px;
            padding: 15px;
            background: #F5F5F5;
            border-radius: 10px;
            border: 2px solid #E8E8E8;
        }
        
        @media (max-width: 480px) {
            .current-time {
                font-size: 28px;
                padding: 12px;
                margin-bottom: 15px;
            }
        }
        
        .check-btn {
            width: 100%;
            padding: 18px;
            background: #7B0F1E;
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            margin-bottom: 25px;
            transition: all 0.3s;
        }
        
        .check-btn:hover:not(:disabled) {
            background: #5A0B16;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(123, 15, 30, 0.3);
        }
        
        .check-btn:disabled {
            background: #ccc;
            cursor: not-allowed;
            transform: none;
        }
        
        .results {
            display: none;
        }
        
        .results.show {
            display: block;
        }
        
        .train-card {
            background: white;
            border-left: 6px solid #7B0F1E;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 15px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s;
        }
        
        @media (max-width: 480px) {
            .train-card {
                padding: 15px;
                border-left-width: 5px;
                margin-bottom: 12px;
            }
        }
        
        .train-card:hover {
            transform: translateX(5px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        
        @media (max-width: 480px) {
            .train-card:hover {
                transform: translateX(3px);
            }
        }
        
        .train-card.kyoto {
            border-left-color: #00A040;
            background: linear-gradient(to right, #F5FFF9 0%, white 10%);
        }
        
        .train-card.takarazuka {
            border-left-color: #FF6600;
            background: linear-gradient(to right, #FFF9F5 0%, white 10%);
        }
        
        .train-card.kobe {
            border-left-color: #0068B7;
            background: linear-gradient(to right, #F5FAFF 0%, white 10%);
        }
        
        .train-time {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 8px;
        }
        
        @media (max-width: 480px) {
            .train-time {
                font-size: 24px;
                margin-bottom: 6px;
            }
        }
        
        .train-line {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        @media (max-width: 480px) {
            .train-line {
                font-size: 16px;
            }
        }
        
        .train-card.kyoto .train-line {
            color: #00A040;
        }
        
        .train-card.takarazuka .train-line {
            color: #FF6600;
        }
        
        .train-card.kobe .train-line {
            color: #0068B7;
        }
        
        .train-info {
            font-size: 14px;
            color: #666;
        }
        
        .no-results {
            text-align: center;
            padding: 40px;
            color: #666;
        }
        
        .line-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
            color: white;
            margin-right: 8px;
        }
        
        .line-badge.kyoto {
            background: #00A040;
        }
        
        .line-badge.takarazuka {
            background: #FF6600;
        }
        
        .line-badge.kobe {
            background: #0068B7;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚃 阪急電車 乗車案内</h1>
        <div class="subtitle">梅田 ⇔ 十三</div>
        
        <div class="station-select">
            <button class="station-btn selected" id="juso-btn" onclick="selectStation('juso')">
                十三
            </button>
            <button class="station-btn" id="umeda-btn" onclick="selectStation('umeda')">
                梅田
            </button>
        </div>
        
        <div class="current-time" id="current-time">
            --:--
        </div>
        
        <button class="check-btn" id="check-btn" onclick="checkTrains()">
            この時刻で検索
        </button>
        
        <div class="results" id="results">
            <!-- 検索結果がここに表示されます -->
        </div>
    </div>
    
    <script>
        let selectedStation = 'juso'; // デフォルトで十三を選択
        
        // サンプル時刻表データ
        const timetableData = {
            umeda_to_juso: [
                { time: "06:00", line: "kyoto", platform: "1", type: "普通", destination: "河原町" },
                { time: "06:10", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "06:15", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "06:25", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "06:30", line: "kobe", platform: "2", type: "普通", destination: "西宮北口" },
                { time: "06:40", line: "takarazuka", platform: "3", type: "普通", destination: "石橋阪大前" },
                { time: "06:50", line: "kyoto", platform: "1", type: "急行", destination: "河原町" },
                { time: "07:00", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "07:10", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "07:20", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "07:30", line: "kobe", platform: "2", type: "急行", destination: "神戸三宮" },
                { time: "07:40", line: "takarazuka", platform: "3", type: "普通", destination: "川西能勢口" },
                { time: "14:20", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "14:25", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "14:30", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "14:40", line: "kyoto", platform: "1", type: "普通", destination: "河原町" },
                { time: "14:50", line: "kobe", platform: "2", type: "急行", destination: "西宮北口" },
                { time: "15:00", line: "takarazuka", platform: "3", type: "普通", destination: "石橋阪大前" },
                { time: "16:00", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "16:10", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "16:20", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "17:00", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "17:15", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "17:30", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "18:00", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "18:15", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "18:30", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "19:00", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "19:15", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "19:30", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "20:00", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "20:15", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "20:30", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "21:00", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "21:15", line: "kobe", platform: "2", type: "特急", destination: "神戸三宮" },
                { time: "21:30", line: "takarazuka", platform: "3", type: "急行", destination: "宝塚" },
                { time: "22:00", line: "kyoto", platform: "1", type: "特急", destination: "河原町" },
                { time: "22:20", line: "kobe", platform: "2", type: "急行", destination: "神戸三宮" },
                { time: "22:40", line: "takarazuka", platform: "3", type: "普通", destination: "宝塚" },
                { time: "23:00", line: "kyoto", platform: "1", type: "普通", destination: "河原町" },
                { time: "23:20", line: "kobe", platform: "2", type: "普通", destination: "神戸三宮" },
                { time: "23:40", line: "takarazuka", platform: "3", type: "普通", destination: "宝塚" },
            ],
            juso_to_umeda: [
                { time: "06:05", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "06:12", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "06:18", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "06:28", line: "kyoto", platform: "3", type: "普通", destination: "梅田" },
                { time: "06:35", line: "kobe", platform: "1", type: "急行", destination: "梅田" },
                { time: "06:42", line: "takarazuka", platform: "2", type: "普通", destination: "梅田" },
                { time: "06:52", line: "kyoto", platform: "3", type: "急行", destination: "梅田" },
                { time: "07:02", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "07:12", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "07:22", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "07:32", line: "kobe", platform: "1", type: "急行", destination: "梅田" },
                { time: "07:42", line: "takarazuka", platform: "2", type: "普通", destination: "梅田" },
                { time: "14:23", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "14:28", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "14:33", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "14:43", line: "kyoto", platform: "3", type: "普通", destination: "梅田" },
                { time: "14:53", line: "kobe", platform: "1", type: "急行", destination: "梅田" },
                { time: "15:03", line: "takarazuka", platform: "2", type: "普通", destination: "梅田" },
                { time: "16:05", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "16:15", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "16:25", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "17:05", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "17:20", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "17:35", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "18:05", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "18:20", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "18:35", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "19:05", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "19:20", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "19:35", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "20:05", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "20:20", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "20:35", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "21:05", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "21:20", line: "kobe", platform: "1", type: "特急", destination: "梅田" },
                { time: "21:35", line: "takarazuka", platform: "2", type: "急行", destination: "梅田" },
                { time: "22:05", line: "kyoto", platform: "3", type: "特急", destination: "梅田" },
                { time: "22:25", line: "kobe", platform: "1", type: "急行", destination: "梅田" },
                { time: "22:45", line: "takarazuka", platform: "2", type: "普通", destination: "梅田" },
                { time: "23:05", line: "kyoto", platform: "3", type: "普通", destination: "梅田" },
                { time: "23:25", line: "kobe", platform: "1", type: "普通", destination: "梅田" },
                { time: "23:45", line: "takarazuka", platform: "2", type: "普通", destination: "梅田" },
            ]
        };
        
        // 路線情報
        const lineInfo = {
            kyoto: { name: "京都線", class: "kyoto" },
            takarazuka: { name: "宝塚線", class: "takarazuka" },
            kobe: { name: "神戸線", class: "kobe" }
        };
        
        // 現在時刻の表示（1秒ごとに更新）
        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            document.getElementById('current-time').textContent = `${hours}:${minutes}`;
        }
        
        setInterval(updateTime, 1000);
        updateTime();
        
        // 駅選択
        function selectStation(station) {
            selectedStation = station;
            
            // ボタンのスタイル更新
            document.getElementById('umeda-btn').classList.remove('selected');
            document.getElementById('juso-btn').classList.remove('selected');
            document.getElementById(`${station}-btn`).classList.add('selected');
            
            // 検索ボタンを有効化
            document.getElementById('check-btn').disabled = false;
            
            // 結果を非表示に
            document.getElementById('results').classList.remove('show');
        }
        
        // 時刻をミリ秒に変換
        function timeToMinutes(timeStr) {
            const [hours, minutes] = timeStr.split(':').map(Number);
            return hours * 60 + minutes;
        }
        
        // 電車検索
        function checkTrains() {
            const now = new Date();
            const currentMinutes = now.getHours() * 60 + now.getMinutes();
            
            // 時刻表データを選択
            const timetable = selectedStation === 'umeda' 
                ? timetableData.umeda_to_juso 
                : timetableData.juso_to_umeda;
            
            // 現在時刻以降の電車を抽出
            const upcomingTrains = timetable.filter(train => {
                return timeToMinutes(train.time) >= currentMinutes;
            });
            
            // 次の3本を取得
            const nextThreeTrains = upcomingTrains.slice(0, 3);
            
            // 結果を表示
            displayResults(nextThreeTrains);
        }
        
        // 結果表示
        function displayResults(trains) {
            const resultsDiv = document.getElementById('results');
            
            if (trains.length === 0) {
                resultsDiv.innerHTML = '<div class="no-results">本日の運行は終了しました</div>';
                resultsDiv.classList.add('show');
                return;
            }
            
            let html = '';
            trains.forEach(train => {
                const info = lineInfo[train.line];
                html += `
                    <div class="train-card ${info.class}">
                        <div class="train-time">${train.time} 発 | ${train.platform}番線</div>
                        <div class="train-line">
                            <span class="line-badge ${info.class}">${info.name}</span>
                            ${train.type} ${train.destination}行き
                        </div>
                    </div>
                `;
            });
            
            resultsDiv.innerHTML = html;
            resultsDiv.classList.add('show');
        }
    </script>
</body>
</html>