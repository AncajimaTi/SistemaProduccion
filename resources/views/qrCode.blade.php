<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
    
<div class="visible-print text-center">
	<h1>Laravel 5.7 - QR Code Generator Example</h1>
    <?php echo $cabecera = "hola" ?> 

    {!! QrCode::size(250)->generate($cabecera); !!}
     
    <p>example by ItSolutionStuf.com.</p>
</div>
    
</body>
</html>