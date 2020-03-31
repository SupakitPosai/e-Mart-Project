<?php

namespace App\Http\Controllers\Api;
use App\PaymentMethod;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $paymentMethod = PaymentMethod::where('status_pm','=',"ใช้งาน")->get();
        return response()->json($paymentMethod);
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
        //

        $id_member = $this->setMD5();
        $Payment = new PaymentMethod();

        $Payment->id_payment_method = $id_member ;
        $Payment->name_payment_method = $request->get('name_payment_method');
        // $Payment->key_payment_method = $request->get('key_payment_method');
     


        $Payment->save();
        return $Payment;
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
        return PaymentMethod::find($id);
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
        

        if ($request->get('key_payment_method') != '') {
             $PaymentMethod = PaymentMethod::find($id);      
         $PaymentMethod->name_payment_method = $request->get('name_payment_method');
         $PaymentMethod->key_payment_method = $request->get('key_payment_method');
        
         $PaymentMethod->save();
         return $PaymentMethod;
        }else {
             $PaymentMethod = PaymentMethod::find($id); 
            $PaymentMethod->name_payment_method = $request->get('name_payment_method');
        
        
         $PaymentMethod->save();
         return $PaymentMethod;
        }
        
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
        $PaymentMethod = PaymentMethod::find($id);
        $PaymentMethod->status_pm = "ไม่ใช้งาน";        
        
         $PaymentMethod->save();
         return $PaymentMethod;
    }
    public function setMD5(){

        $passuniq = uniqid();
        $passmd5 = md5($passuniq);
    
        $sumlenght = strlen($passmd5);#num passmd5
    
        $letter_pre = chr(rand(97,122));#set char for prefix
    
        $letter_post = chr(rand(97,122));#set char for postfix
    
        $letter_mid = chr(rand(97,122));#set char for middle string
    
        $num_rand = rand(0,$sumlenght);#random for cut passmd5
    
        $cut_pre = substr($passmd5,0,$num_rand);#cutmd5 start 0 stop $numrand
        $setmid = $cut_pre.$letter_mid;#set pre string + char middle
    
        $cut_post = substr($passmd5,$num_rand, $sumlenght+1);
    
        $set_modify_md5 = $letter_pre.$setmid.$cut_post.$letter_post;
        return $set_modify_md5;
    
       }
}
