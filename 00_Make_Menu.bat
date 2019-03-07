@echo OFF
cls
set CUR_PATH=%~dp0
set COCOS_TOOL=C:\CocosCreator\CocosCreator.exe
set FBUILD=%~dp0\Tools\FastBuild

set Prj_WIN32=%~dp0\\Prj\Win32 
set Prj_ANDROID=%~dp0\\Prj\Android 

color 02
echo.
echo 	===================================
echo 	===============MENU================
echo 	===================================
echo.
echo 	  Working ON: %CUR_PATH%
echo.

echo 	0. Clean GIT
echo 	1. Remove folder auto genarate
echo 	2. Update to HEAD
echo 	3. Build Android

echo 	99. Exit

echo.
set /p opt=		Enter choose: 

if "%opt%"=="0" goto Clean
if "%opt%"=="1" goto RemoveFolder
if "%opt%"=="2" goto UpdatetoHead
if "%opt%"=="3" goto BuildAndroid


REM-------------------------Function--------------------------
:fClean
	echo Clear ....
	call git clean -fd
	call git clean -f -x -d
	call git clean -fxd
	call git clean -fd
	call reset --hard
	exit /b
:fRemoveFolder
	echo remove folder
	REM cd %FBUILD%
	rd /s /q "bin"
	rd /s /q "proj.win32/hello.VC.db"
	rd /s /q "proj.win32/Debug.win32"
	rd /s /q "packages"
	rd /s /q "temp"
	rd /s /q "library"
	rd /s /q "local"
	rd /s /q "packages"
	rd /s /q "temp"
	pause
	exit /b
	
:fBuildAndroid
	echo Build Andorid
	call %COCOS_TOOL% --path %CUR_PATH% --build "platform=android;debug=true;autoCompile=true"

	pause
	exit /b
:fUpdateToHead 
	echo Update to HEAD
	cd %CUR_PATH%
	call git fetch
	cd %CUR_PATH%
	call git pull
	exit /b
:fBuild_Apk
	echo Build APK
	cd %Prj_ANDROID%
	call gradlew.bat assembleDebug
	adb install -r app\build\outputs\apk\debug\app-debug.apk
	adb shell am start -n "hieu.com.a3dengine/hieu.com.a3dengine.MainActivity" -a android.intent.action.MAIN -c android.intent.category.LAUNCHER
	exit /b
REM-----------------------------------------------------------

REM------------ 00. Clean GIT.-------------
:Clean
	call :fClean
goto :End

REM------------ 01. Remove folder -------------
:RemoveFolder
	call :fRemoveFolder
goto :End
REM----------------------------------------

REM------------ 02. Update to HEAD---------------
:UpdatetoHead
	call :fUpdateToHead

goto :End	
REM----------------------------------------

REM------------ 03. SetUp Cocos2dx---------------
:BuildAndroid
	echo Build Andorid
	call :fBuildAndroid
	
goto :End	
REM----------------------------------------

:End

pause

cd %CUR_PATH%
call 00_Make_Menu.bat

