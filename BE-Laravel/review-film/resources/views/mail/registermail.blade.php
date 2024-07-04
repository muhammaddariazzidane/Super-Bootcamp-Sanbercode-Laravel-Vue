<!doctype html>
<html>

<head>
    <meta http-equiv=3D"Content-Type" content=3D"text/html; charset=3DUTF-8">
    <style>
        .main {
            background-color: white;
        }

        a:hover {
            border-left-width: 1em;
            min-height: 2em;
        }
    </style>
</head>

<body style=3D"font-family: sans-serif;">
    <div style=3D"display: block; margin: auto; max-width: 600px;" class=3D"main">
        <h1 style=3D"font-size: 18px; font-weight: bold; margin-top: 20px">Register berhasil</h1>
        <p>Selamat bapak/ibu {{ $name }}</p>
        <p>silahkan gunakan otp code nya sebelum 5 menit sejak menerima email ini.</p>
        <p style="background: darkred; padding: 1rem; text-align: center; color: white; display: block;">
            {{ $otp }}</p>
    </div>
</body>

</html>
