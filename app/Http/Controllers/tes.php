<?php

$eksekusi = shell_exec('python sedotTokped.py "helloo"');

if($eksekusi) {
    echo $eksekusi;
    echo " sukses";
} else {
    echo " gagal";
}






?>