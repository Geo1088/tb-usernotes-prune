This is a script for pruning your Toolbox usernotes of all notes older than a given number of years. To run it, clone this repository, then run:

    yarn # or: npm install
    ./prune.js input.json output.json 3

where `3` is the number of years old a note should be if you want to prune it, `input.json` is a file containing your usernotes data, and `output.json` is the file you want the result to be written to.

Once you have your pruned result, paste it into your usernotes wiki and have your co-mods clear their toolbox caches.

also lol this won't work because the js toolbox api package isn't a thing yet.
