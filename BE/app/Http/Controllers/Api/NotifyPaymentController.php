<?php

namespace App\Http\Controllers\Api;

use App\NotifyPayment;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class NotifyPaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $NotifyPayment = NotifyPayment::where('id_order', '=', $request->id_order)->get();
        return $NotifyPayment;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $date = date("Y-m-d_H-i-s");



        $id_member = $this->setMD5();
        //
        $NotifyPayment = new NotifyPayment();
        $NotifyPayment->id_notify_pay = $id_member;
        $NotifyPayment->date_notify_pay = $request->get('date_notify_pay');        
        $NotifyPayment->id_payment_method = $request->get('id_payment_method');
        $NotifyPayment->id_order = $request->get('id_order');

        if ($request->get('file') != '') {
            $NotifyPayment->image_notify_pay = "/img_notify_pay/notify-" . $date . ".jpg";
            $img = str_replace('data:image/jpeg;base64,', '', $request->get('file'));
            $img = str_replace(' ', '+', $img);
            echo file_put_contents(storage_path() . "/img_notify_pay/notify-" . $date . ".jpg", base64_decode($img));
        }else {
            $NotifyPayment->image_notify_pay = "/img_notify_pay/gateway.jpg";
        }


        $NotifyPayment->save();
        return $NotifyPayment;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function setMD5()
    {

        $passuniq = uniqid();
        $passmd5 = md5($passuniq);

        $sumlenght = strlen($passmd5); #num passmd5

        $letter_pre = chr(rand(97, 122)); #set char for prefix

        $letter_post = chr(rand(97, 122)); #set char for postfix

        $letter_mid = chr(rand(97, 122)); #set char for middle string

        $num_rand = rand(0, $sumlenght); #random for cut passmd5

        $cut_pre = substr($passmd5, 0, $num_rand); #cutmd5 start 0 stop $numrand
        $setmid = $cut_pre . $letter_mid; #set pre string + char middle

        $cut_post = substr($passmd5, $num_rand, $sumlenght + 1);

        $set_modify_md5 = $letter_pre . $setmid . $cut_post . $letter_post;
        return $set_modify_md5;
    }
}
