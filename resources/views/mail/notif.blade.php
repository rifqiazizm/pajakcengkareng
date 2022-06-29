<style>

    .judul {
        color : red;
    }

    .email {
        border : solid 2px black;
        margin-top : 50px;

    }

    th,td {
        padding : 10px;
    }

</style>



<h1 class="judul">Testing email dengan mailtrap by 
	Rifqi Aziz
</h1>
<h2>Anda mendapat pesan dari : AdminX10</h2>

	
<div>
<h2> nama WP : {{ $namaWP }}</h2>
    <table class="email">
    <tr>
        <th>Rincian </th>
        <th>Nilai</th>

    </tr>
    <tr>
        <td>Luas Wilayah</td>
        <td>{{ $rincianPBB['luas_wilayah'] }}</td>
    </tr>

    <tr>
        <td>Nilai Bumi per M</td>
        <td>{{ $rincianPBB['nilaiBumi_perM'] }}</td>
    </tr>
    

    <tr>
        <td>Total Tangkapan</td>
        <td>{{ $rincianPBB['tangkapanTot'] }}</td>
    </tr>
    
    <tr>
        <td>NJOP</td>
        <td>{{ $rincianPBB['njop'] }}</td>
    </tr>

    <tr>
        <td>Jumlah Ikan </td>
        <td>{{ $rincianPBB['jml_ikan'] }}</td>
    </tr>

    <tr>
        <td>PBB Terutang </td>
        <td>{{ $rincianPBB['pbb'] }}</td>
    </tr>

    </table>
</div>
