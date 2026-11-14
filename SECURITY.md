# Security

## Reporting

Please report security problems privately through GitHub's **Report a vulnerability** (Security tab) on this repository rather than in a public issue.

## How the project handles secrets

- **Nothing secret is stored in the repository.** Definitions reject fields that look like secrets (`password`, `adminPassword`, `pat`, `productKey`, and others). Test values are labelled `TEST-ONLY-not-a-real-password`.
- **Credentials are entered at media build**, through `Get-Credential` on the command line or a native dialog in the app, and reach the engine on stdin. They never appear in command lines, plans, manifests, receipts, or logs; the tests check this.
- **Answer media is sensitive.** Windows answer files encode the administrator password (base64, as Windows requires; this is not encryption) and carry the domain-join password in plain text, because `Microsoft-Windows-UnattendedJoin` has no other form. Answer media is written to a folder limited to the current user, SYSTEM, and Administrators, and should be deleted after the build. Use a dedicated domain-join account with only the rights to join computers.
- **Code clone tokens** (`AZURE_DEVOPS_PAT`) are read inside the guest from a machine environment variable and passed to git through an askpass helper, never on media or in a URL.
- **No implicit downloads or installs.** Install ISOs are checked against the publisher's SHA-256; modules are installed by you, at versions you choose.
- **Apply is guarded**: the reviewed plan hash, an explicit target name, verified media, and PowerShell's confirmation prompt are all required, and nothing is rolled back or deleted automatically.

## Scope

This tool creates virtual machines on infrastructure you point it at. Run the first build of any new definition against non-production infrastructure with a disposable VM.
