@echo off
cls
:begin
echo.
echo.
echo Interface build tool - select an option
echo.
echo ==========================================
echo.
echo 1) Build (Production)
echo 2) Watch (Development watcher)
echo 3) Install (Install dependencies)
echo 4) Exit
echo.
echo ==========================================
echo.
set /p op=Type option:
if "%op%"=="1" goto op1
if "%op%"=="2" goto op2
if "%op%"=="3" goto op3
if "%op%"=="4" goto exit

echo Please Pick an option:
goto begin

:op1
echo you picked option 1
goto build

:op2
echo you picked option 2
goto watch

:op3
echo you picked option 3
goto install

:exit
@exit

:: Execute the documentation watcher
:build
set OLDDIR=%CD%
cd..
cd Interface\configs\grunt
echo Grunting
call grunt
cd %OLDDIR%
echo Finished installing - See above list for complete overview of build events
PAUSE
goto begin

:: Execute the scss watcher
:watch
set OLDDIR=%CD%
cd..
cd Interface\configs\grunt
call grunt dev
goto begin

:: Installer
:install
set OLDDIR=%CD%
echo Installing node modules
cd..
cd Interface\configs\grunt
echo Installing Load Config
call npm install load-grunt-config
echo Installing NPM dependencies
call npm install
echo Node modules successfully grabbed!
echo Grunting
call grunt
cd %OLDDIR%
PAUSE
goto begin