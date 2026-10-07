@echo off
rem Release build: version check, offline tests, publish, smoke test, zip, SHA-256 sums.
rem Output: dist\MultiInstallIso-<version>-win-x64\MultiInstallIso.exe
pwsh -NoProfile -ExecutionPolicy Bypass -File "%~dp0tools\Build-Release.ps1" %*
exit /b %ERRORLEVEL%
