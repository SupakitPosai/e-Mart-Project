<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    //
    protected $table = 'payment';
    protected $primaryKey = 'id_payment';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
