@echo OFF
cls
set CUR_PATH=%~dp0

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

echo 	0. Clean
echo 	1. Build Data
echo 	5. Build Full (SO + Apk)

echo 	99. Exit

echo.
set /p opt=		Enter choose: 

if "%opt%"=="0" goto Clean
if "%opt%"=="1" goto Build_Data


REM-------------------------Function--------------------------
:fClean
	echo Clear ....
	call git clean -fd
	call git clean -f -x -d
	call git clean -fxd
	call git clean -fd
	call reset --hard
	exit /b
:fBuild_Native
	echo Build SO
	cd %FBUILD%
	call %FBUILD%\FBuild.exe -config %FBUILD_CONFIG_NATIVE%
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

REM------------ 01. Build Data-------------
:Build_Data

goto :End
REM----------------------------------------

REM------------ 03. Build APK---------------
:Build_Apk
	call :fBuild_Apk

goto :End	
REM----------------------------------------

REM------------ 03. Build Full---------------
:Build_Full
	echo Build Full SO + Apk

	call :fBuild_Native
	call :fBuild_Apk
	
goto :End	
REM----------------------------------------

:End

pause

cd %CUR_PATH%
call 00_Make_Menu.bat

