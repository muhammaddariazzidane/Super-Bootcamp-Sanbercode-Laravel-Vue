<?php

trait FightTrait
{
    public $attackPower;
    public $defencePower;

    public function serang($target)
    {
        echo "$this->nama sedang menyerang $target->nama <br/>";
        $target->diserang($this);
    }

    public function diserang($penyerang)
    {
        echo "$this->nama sedang diserang <br/>";
        $this->darah -= $penyerang->attackPower / $this->defencePower;
    }
}

abstract class Hewan
{
    public $nama;
    public $darah = 50;
    public $jumlahKaki;
    public $keahlian;

    public function __construct($nama, $jumlahKaki, $keahlian)
    {
        $this->nama = $nama;
        $this->jumlahKaki = $jumlahKaki;
        $this->keahlian = $keahlian;
    }

    public function atraksi()
    {
        echo "$this->nama sedang $this->keahlian <br />";
    }
}

abstract class Fight
{
    use FightTrait;

    public $attackPower;
    public $defencePower;
    public $nama;
    public $darah;

    public function serang($target)
    {
        echo "$this->nama sedang menyerang $target->nama";
        $target->diserang($this);
    }

    public function diserang($penyerang)
    {
        echo "$this->nama sedang diserang";
        $this->darah -= $penyerang->attackPower / $this->defencePower;
    }
}

class Elang extends Hewan
{
    use FightTrait;

    public function __construct($nama)
    {
        $this->nama = $nama;
        $this->jumlahKaki = 2;
        $this->keahlian = "terbang tinggi";
        $this->attackPower = 10;
        $this->defencePower = 5;
    }

    public function getInfoHewan()
    {
        echo "Jenis Hewan: Elang <br/>";
        echo "Nama: $this->nama <br/>";
        echo "Darah: $this->darah <br/>";
        echo "Jumlah Kaki: $this->jumlahKaki <br/>";
        echo "Keahlian: $this->keahlian <br/>";
        echo "Attack Power: $this->attackPower <br/>";
        echo "Defence Power: $this->defencePower <br/>";
    }
}

class Harimau extends Hewan
{
    use FightTrait;

    public function __construct($nama)
    {
        $this->nama = $nama;
        $this->jumlahKaki = 4;
        $this->keahlian = "lari cepat";
        $this->attackPower = 7;
        $this->defencePower = 8;
    }

    public function getInfoHewan()
    {
        echo "Jenis Hewan: Harimau <br/>";
        echo "Nama: $this->nama <br/>";
        echo "Darah: $this->darah <br/>";
        echo "Jumlah Kaki: $this->jumlahKaki <br/>";
        echo "Keahlian: $this->keahlian <br/>";
        echo "Attack Power: $this->attackPower <br/>";
        echo "Defence Power: $this->defencePower <br/>";
    }
}

$elang3 = new Elang("elang_3");
$harimau1 = new Harimau("harimau_1 ");
$harimau2 = new Harimau("harimau_2 ");

$harimau1->atraksi();
echo "------------------------------------------------ <br/>";
$elang3->atraksi();
echo "------------------------------------------------ <br/>";

$harimau1->serang($elang3);
echo "------------------------------------------------ <br/>";

$elang3->serang($harimau2);
echo "------------------------------------------------ <br/>";

$elang3->getInfoHewan();
echo "------------------------------------------------ <br/>";

$harimau1->getInfoHewan();
