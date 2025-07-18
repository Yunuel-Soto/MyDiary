<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\ImageEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EntryController extends Controller
{
    public function index()
    {
        // $entry = Entry::all();

        // return inertia('home', [
        //     'entry' => $entry
        // ]);
    }

    public function create(Request $req)
    {
        $req->validate([
            'body' => ['required'],
        ]);

        $entry = new Entry();
        $entry->body = $req->body;
        $entry->visibility = $req->visibilityValue;
        $entry->creator_id = Auth::user()->id;
        $entry->save();

        if($req->hasFile('file')) {
            $file = $req->file('file');
            $path = $file->store('uploads', 'public');

            $imageEntry = new ImageEntry();
            $imageEntry->name = $file->getClientOriginalName();
            $imageEntry->path = $path;
            $imageEntry->entry_id = $entry->id;
            $imageEntry->save();
        }

        $friends = $req->input('friend');

        if($friends) {
            $entry->users()->attach($friends);
        }

        return redirect()->route('homeSession')->with([
            'message' => 'success_entry',
        ]);
    }

    public function update(Request $req, Entry $entry)
    {
        $entry->body = $req->body;
        $entry->visibility = $req->visibilityValue;
        $entry->save();

        if($req->hasFile('file')) {
            if($entry->imageEntry) {
                $path = $entry->imageEntry->path;

                if(file_exists(storage_path($path))) {
                    unlink(storage_path($path));
                }

                $entry->imageEntry->delete();
            }

            $file = $req->file('file');
            $path = $file->store('uploads', 'public');

            $imageEntry = new ImageEntry();
            $imageEntry->name = $file->getClientOriginalName();
            $imageEntry->path = $path;
            $imageEntry->entry_id = $entry->id;
            $imageEntry->save();
        } elseif (!$req->input('file')) {
            if($entry->imageEntry) {
                $path = $entry->imageEntry->path;

                if(file_exists(storage_path($path))) {
                    unlink(storage_path($path));
                }

                $entry->imageEntry->delete();
            }
        }

        $friends = $req->input('friend');

        if($friends) {
            $entry->users()->sync($friends);
        }

        return redirect()->route('homeSession')->with([
            'message' => 'update_entry',
        ]);

    }

    public function delete(Entry $entry)
    {
        $entry->delete();

        return redirect()->route('homeSession')->with([
            'message' => 'delete_entry'
        ]);
    }
}
