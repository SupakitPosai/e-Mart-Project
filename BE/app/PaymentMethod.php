<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
    //
    protected $table = 'payment_method';
    protected $primaryKey = 'id_payment_method';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
