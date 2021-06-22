# Auto eSMS

from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from datetime import date
#from pyvirtualdisplay import Display

import sys
import time

def main(wfh = "tidak") :
   # display - Display(visible=0, size=(1024,768))
   # display.start()
   # cap = DesiredCapabilities().FIREFOX
   # cap["marionette"] = False
    options = FirefoxOptions()
    #options.setheadless(headless = True)
    options.add_argument("--headless")
    options.add_argument('--start-maximized')
    browser = webdriver.Firefox(executable_path='/usr/local/bin/geckodriver',options=options)
    print('Browser opened')
    today = date.today()

    delay = 1

# buka eSMS
    print('Membuka google form')
    browser.get('http://pgn.id/AbsensiHarianPGNGroup')


    while True:
        try:
            wait = WebDriverWait(browser, 600, poll_frequency=1)
            wait.until(EC.presence_of_element_located((By.XPATH, "//div[@role='option' and contains(@class, 'isPlaceholder')]")))
    
            print("Google Form Ready")
            ele = browser.find_element("xpath", '//body')
            total_height = ele.size["height"]+1000
            browser.set_window_size(1920, total_height)      #the trick

           # Nama
            pilihan = browser.find_elements_by_xpath("//div[@role='option' and contains(@class, 'isPlaceholder')]")
            pilihan[0].click()
            # get names
            names = browser.find_elements_by_xpath("//div[@role='option' and not(contains(@class, 'isPlaceholder'))]")
        #optionText = [i.text for i in names]
        #select name
        #names[optionText.index('Dionisius Kristian Tirta Aji (0014932766) - PT PGAS Solution')].click()
        #print(pilihan[0].text)
            #WebDriverWait(browser, 1000000).until(EC.element_to_be_clickable(names[541])).click()
            names[541].click()
            time.sleep(delay)

            pilihan[1].click()
            namaPerusahaan = browser.find_elements_by_xpath("//div[@role='option' and not(contains(@class, 'isPlaceholder'))]")
            #perusahaanText = [i.text for i in namaPerusahaan]
        #namaPerusahaan[perusahaanText.index('PT PGN Tbk')].click()
            #print(perusahaanText.index('PT PGN Tbk'))
            #hover(namaPerusahaan[0])
            #WebDriverWait(browser, 1000000).until(EC.element_to_be_clickable(namaPerusahaan[0])).click()
            #namaPerusahaan.scroll
            time.sleep(delay)
            namaPerusahaan[2122].click()
            time.sleep(delay)

            pilihan[2].click()
            time.sleep(delay)
            satKer = browser.find_elements_by_xpath("//div[@role='option' and not(contains(@class, 'isPlaceholder'))]")
            #satkerText = [i.text for i in satKer]
        #satKer[satkerText.index('Area Lampung')].click()
            #print(satkerText.index('Area Lampung'))
            satKer[2146].click()
            time.sleep(delay)
            #browser.save_screenshot("screenshot.png")

            pilihan[3].click()
            time.sleep(delay)
            status = browser.find_elements_by_xpath("//div[@role='option' and not(contains(@class, 'isPlaceholder'))]")
            #statusText = [i.text for i in status]
        #status[statusText.index('PWTT / Direct Hire/ Organik')].click()
            #print(statusText.index('PWTT / Direct Hire/ Organik'))
            status[2196].click()
            time.sleep(delay)

            pilihan[4].click()
            time.sleep(delay)
            sistemKerja = browser.find_elements_by_xpath("//div[@role='option' and not(contains(@class, 'isPlaceholder'))]")
            #sistemkerjaText = [i.text for i in sistemKerja]
        
            if wfh =="ya" :
                #print(sistemkerjaText.index("Work From Home"))
                sistemKerja[2199].click()
                #time.sleep(delay)
            elif today.strftime("%A") == "Saturday" or today.strftime("%A") == "Sunday" :
                sistemKerja[2201].click()
            #print(sistemkerjaText.index("Others (Pekerja Shift Off/Off Duty, Pekerja Cuti, Ijin, dan HARI LIBUR)"))
            else :
                sistemKerja[2200].click()
            #sistemKerja[sistemkerjaText.index("Work From Office/Station/Area")].click()
            #print(sistemkerjaText.index("Work From Office/Station/Area"))
            time.sleep(delay)

            pilihan[5].click()
            time.sleep(delay)
            lokasi = browser.find_elements_by_xpath("//div[@role='option' and not(contains(@class, 'isPlaceholder'))]")
            #lokasiText = [i.text for i in lokasi]
            #print(lokasiText.index('Kantor Area Lampung'))
            lokasi[2214].click()
            time.sleep(delay)

            radiobuttons = browser.find_elements_by_class_name("appsMaterialWizToggleRadiogroupElContainer")
            radiobuttons[4].click()
            radiobuttons[8].click()
            radiobuttons[10].click()
            radiobuttons[12].click()
            #browser.save_screenshot("screenshot1.png")

            checkboxes = browser.find_elements_by_class_name("quantumWizTogglePapercheckboxInnerBox")
            checkboxes[0].click()

            textboxes = browser.find_elements_by_class_name("quantumWizTextinputPaperinputInput")
            textboxes[0].send_keys('081225510541')

            time.sleep(delay)
            browser.save_screenshot("screenshot.png")
        #show_image("screenshot1.png")
        
            submitbutton = browser.find_element_by_class_name("appsMaterialWizButtonPaperbuttonContent")
            submitbutton.click()


            print('google form complete')

            break # it will break from the loop once the specific element will be present. 
        except Exception as e:
            print(e)
            browser.quit()
# ketika masih ada surat masuk

    browser.quit()

if __name__ == '__main__':
    main()

    
