<?php

namespace App\Http\Controllers\Api;
use App\Cart;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $cartAll_ID = DB::table('cart')
        ->join('product', 'cart.id_product', '=', 'product.id_product')  
        ->join('shop', 'product.id_shop', '=', 'shop.id_shop')
        ->where('cart.id_user','=', $request->id_user)
        // ->where('shop.id_shop','=',"shop.id_shop")
        ->where('cart.status','=','ยืนยัน')       
        ->select('shop.id_shop','shop.name_shop')
        ->distinct('shop.id_shop')
        ->get();
          
       // $cartAll_ID = Cart::where('id_user','=', $request->id_user)->where('status','=','ยืนยัน')->get();
        return $cartAll_ID;
       
        //
        // $cart = Cart::all();
        // return response()->json($cart);
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
        $cart = new Cart();

        $cart->id_user = $request->get('id_user');
        $cart->id_product = $request->get('id_product');
        $cart->price_product = $request->get('price_product');
        $cart->num_product = $request->get('num_product');
        $cart->date_cart = $request->get('date_cart');
        $cart->property = $request->get('property');
        $cart->img_product = $request->get('img_product');
        $cart->status = "ยืนยัน";
        
       

        $cart->save();
        return $cart;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        $cart = Cart::where('date_cart','=',$request->date_cart)
        ->where('id_product','=',$request->id_product)
        ->where('status','=','ยืนยัน')
        ->first();
        $cart->num_product =  $request->get('num_product');
       
         $cart->save();

         return $cart;

       // return response()->json('Users Updated Successfully.');

        //

        // $cartAll_ID = Cart::where('id_user','=',$request->id_user)->get();
        // return $cartAll_ID;
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
    public function update(Request $request,$id)
    {
        //
        $cart = Cart::where('date_cart','=',$id)->where('status','=','ยืนยัน')->first();
        $cart->status = "ยืนยันการสั่งซื้อ";
       
        $cart->save();

        // return $cart;

        return response()->json('Users Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        //
        $cart = Cart::where('date_cart','=',$request->date_cart)
        ->where('id_product','=',$request->id_product)->first();
        $cart->status = "ยกเลิก";
        $cart->save();
        return response()->json('Users Deleted Successfully.');
    }
    //$request->id_user
    public function getid(){
        $cartAll_ID = Cart::where('id_user','=','6')->get();
        return $cartAll_ID;
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
