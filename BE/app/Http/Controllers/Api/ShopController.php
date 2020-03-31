<?php

namespace App\Http\Controllers\Api;
use App\Shop;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shop = Shop::all();
        return response()->json($shop);
        //   $url = Storage::url('shop-2019-12-09_13-57-36.jpg');
        // return "<img src='".$url."'/>";
        
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
        $id_member = $this->setMD5();
        $date=date("Y-m-d_H-i-s");
        
        $img = str_replace('data:image/jpeg;base64,','',$request->get('file'));
        $img = str_replace(' ','+',$img);
        echo file_put_contents(storage_path()."/img_shop/shop-".$date.".jpg", base64_decode($img));

        $shop = new Shop();
        $shop->id_shop=$id_member;
        $shop->name_shop = $request->get('name_shop');
        $shop->address_shop = $request->get('address_shop');
        $shop->tax_id = $request->get('tax_id');
        $shop->tel_shop = $request->get('tel_shop');
        $shop->id_user = $request->get('id_user');
        $shop->img_shop = "/img_shop/shop-".$date.".jpg";
       

        $shop->save();
        return $shop;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Shop::find($id);
        // $url = Storage::url('shop-2019-12-09_13-57-36.jpg');
        // return "<img src='".$url."'/>";
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
        $shop = Shop::find($id);
        $shop->name_shop = $request->get('name_shop');
        $shop->address_shop = $request->get('address_shop');
        $shop->tax_id = $request->get('tax_id');
        $shop->tel_shop = $request->get('tel_shop');
        $shop->img_shop = $request->get('img_shop');
        $shop->save();


        return response()->json('Users Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $shop = Shop::find($id);
        $shop->delete();
        return response()->json('Users Deleted Successfully.');
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
