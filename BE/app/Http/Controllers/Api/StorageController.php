<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class StorageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        
        $image_source = storage_path() . $request->nameimg;
        $image = fopen($image_source, 'r');
        $image_string = fread($image, filesize($image_source));

        $img = base64_encode($image_string);
        return 'data:image/png;base64,' . $img;



        // echo $img . '<br />';
        //  return '<img src="data:image/jpg;base64,'.$img.'" />';
        // $url = Storage::url('product-2019-12-11_07-58-41.jpg');
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
        //
        $img = str_replace('data:image/jpeg;base64,', '', $request->get('file'));
        $img = str_replace(' ', '+', $img);
        echo file_put_contents(storage_path() . $request->get('nameimg'), base64_decode($img));
        return $request->get('nameimg');
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
        $url = storage_path().'/banner/banner1.jpg';
        return "<img src='".$url."'/>";
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
    public function destroy(Request $request, $id)
    {
        //
        if (\File::exists(storage_path() . $request->nameimg)) {
            \File::delete(storage_path() . $request->nameimg);
            return ('true');
        } else {
            return (storage_path() . $request->nameimg);
        }
    }
}
