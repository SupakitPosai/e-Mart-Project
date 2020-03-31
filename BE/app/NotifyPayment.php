<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class NotifyPayment extends Model
{
    //
    protected $table = 'notify_payment';
    protected $primaryKey = 'id_notify_pay';

    //public $incrementing = false;
    
    public $timestamps = false;
    protected $keyType = 'string';
}
