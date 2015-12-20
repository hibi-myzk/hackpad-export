# Hackpad Export

Exports your hackpads to markdown, html or plaintext.

To run:

    node index.js -c <your client ID> -s <your secret> --format <format to export in> -d <your domain ID> -p <export directory> <pad ID 1> <pad ID 2>...

You can get your client ID and secret on the [account settings](https://hackpad.com/ep/account/settings/).

The format can be either `html`, `md`, or `txt`.

The domain ID is `foo` if your domain is `foo.hackpad.com`.

Exports all pad if pad ID ommited.

Each input pad will be saved to `<pad ID>.<format>` in the cwd.
