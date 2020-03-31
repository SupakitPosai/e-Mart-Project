<?php

namespace App\Http\Controllers\Api;

use App\TypeProduct;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TypeProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $type_product = TypeProduct::where('status_type','=', 'ขาย')->get();
        return $type_product;
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
        echo file_put_contents(storage_path()."/img_type/type-".$date.".jpg", base64_decode($img));

        $type_product = new TypeProduct();
        
        $type_product->id_type = $id_member;
        $type_product->name_type = $request->get('name_type');
        $type_product->status_type = $request->get('status_type');
        $type_product->level_type = $request->get('level_type');
        if($request->get('file')!=''){
            $type_product->img_type = "/img_type/type-".$date.".jpg";
        }else{
            $type_product->img_type = null;
        }
        
       
        $type_product->save();
        return $type_product;
        //อัพรูปปปปป
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id_type
     * @return \Illuminate\Http\Response
     */
    public function show($id_type)
    {
        return TypeProduct::find($id_type);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id_type
     * @return \Illuminate\Http\Response
     */
    public function edit($id_type)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id_type
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id_type)
    {
       
            $type_product = TypeProduct::find($id_type);
            $type_product->name_type = $request->get('name_type');
            $type_product->status_type = $request->get('status_type');
            $type_product->save();

      
        


        return response()->json('Users Updated Successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id_type
     * @return \Illuminate\Http\Response
     */
    public function destroy($id_type)
    {
        $type_product = TypeProduct::find($id_type);
        $type_product->status_type = 'ยกเลิก';
        $type_product->save();
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
