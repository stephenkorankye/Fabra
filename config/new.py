


# importing everyting from tkinter
from tkinter import *
# expression to access among all the functions
expression = ""
# functions
def input_number(number, equation):
   # accessing the global expression variable
   global expression
   # concatenation of string
   expression = expression + str(number)
   equation.set(expression)
def clear_input_field(equation):
   global expression
   expression = ""
   # setting empty string in the input field
   equation.set("Enter the expression")
def evaluate(equation):
	global expression
	# trying to evaluate the expression
	try:
		result = str(eval(expression))
		# showing the result in the input field
		equation.set(result)
		# setting expression to empty string
		expression = ""
	except:
		# some error occured
		# showing it to the user equation.set("Enter a valid expression")
		expression = ""
# creating the GUI
def main():
   window = Tk()
   # setting the title of GUI window
   window.title("Calculator")
   # set the configuration of GUI window
   window.geometry("600x300")
   # varible class instantiation
   equation = StringVar()
   # input field for the expression
   input_field = Entry(window, textvariable=equation)
   input_field.place(height=100)
   # we are using grid position
   # for the arrangement of the widgets
   input_field.grid(columnspan=4, ipadx=100, ipady=5)
   # settin the placeholder message for users
   equation.set("Enter the expression")
   # creating buttons and placing them at respective positions
   _1 = Button(window, text='1', fg='white', bg='black', bd=0, command=lambda: input_number(1, equation), height=4, width=15)
   _1.grid(row=2, column=0)
   _2 = Button(window, text='2', fg='white', bg='black', bd=0, command=lambda: input_number(2, equation), height=4, width=15)
   _2.grid(row=2, column=1)
   _3 = Button(window, text='3', fg='white', bg='black', bd=0, command=lambda: input_number(3, equation), height=4, width=15)
   _3.grid(row=2, column=2)
   _4 = Button(window, text='4', fg='white', bg='black', bd=0, command=lambda: input_number(4, equation), height=2, width=7)
   _4.grid(row=3, column=0)
   _5 = Button(window, text='5', fg='white', bg='black', bd=0, command=lambda: input_number(5, equation), height=2, width=7)
   _5.grid(row=3, column=1)
   _6 = Button(window, text='6', fg='white', bg='black', bd=0, command=lambda: input_number(6, equation), height=2, width=7)
   _6.grid(row=3, column=2)
   _7 = Button(window, text='7', fg='white', bg='black', bd=0, command=lambda: input_number(7, equation), height=2, width=7)
   _7.grid(row=4, column=0)
   _8 = Button(window, text='8', fg='white', bg='black', bd=0, command=lambda: input_number(8, equation), height=2, width=7)
   _8.grid(row=4, column=1)
   _9 = Button(window, text='9', fg='white', bg='black', bd=0, command=lambda: input_number(9, equation), height=2, width=7)
   _9.grid(row=4, column=2)
   _0 = Button(window, text='0', fg='white', bg='black', bd=0, command=lambda: input_number(0, equation), height=2, width=7)
   _0.grid(row=5, column=0)
   plus = Button(window, text='+', fg='white', bg='black', bd=0, command=lambda: input_number('+', equation), height=2, width=7)
   plus.grid(row=2, column=3)
   minus = Button(window, text='-', fg='white', bg='black', bd=0, command=lambda: input_number('-', equation), height=2, width=7)
   minus.grid(row=3, column=3)
   multiply = Button(window, text='*', fg='white', bg='black', bd=0, command=lambda:  input_number('*', equation), height=2, width=7)
   multiply.grid(row=4, column=3)
   divide = Button(window, text='/', fg='white', bg='black', bd=0, command=lambda: input_number('/', equation), height=2, width=7)
   divide.grid(row=5, column=3)
   equal = Button(window, text='=', fg='white', bg='black', bd=0, command=lambda: evaluate(equation), height=2, width=7)
   equal.grid(row=5, column=2)
   clear = Button(window, text='Clear', fg='white', bg='black', bd=0, command=lambda: clear_input_field(equation), height=2, width=7)
   clear.grid(row=5, column=1)
   # showing the GUI
   window.mainloop()
# start of the program
if __name__ == '__main__':
      main()










'''

from tkinter import *
import re

class Calculator:
    def __init__(self, master):
        self.master = master
        master.title("Python Calculator")
			
		Tk().geometry("500x500") 	
			
        # create screen widget
        self.screen = Text(master, state='disabled', width=30, height=3,background="yellow", foreground="blue")

        # position screen in window
        self.screen.grid(row=0,column=0,columnspan=4,padx=5,pady=5)
        self.screen.configure(state='normal')

        # initialize screen value as empty
        self.equation = ''

        # create buttons using method createButton
        b1 =  self.createButton(7)
        b2 = self.createButton(8)
        b3 = self.createButton(9)
        b4 = self.createButton(u"\u232B",None)
        b5 = self.createButton(4)
        b6 = self.createButton(5)
        b7 = self.createButton(6)
        b8 = self.createButton(u"\u00F7")
        b9 = self.createButton(1)
        b10 = self.createButton(2)
        b11 = self.createButton(3)
        b12 = self.createButton('*')
        b13 = self.createButton('.')
        b14 = self.createButton(0)
        b15 = self.createButton('+')
        b16 = self.createButton('-')
        b17 = self.createButton('=',None,34)

        # buttons stored in list
        buttons = [b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11,b12,b13,b14,b15,b16,b17]

        # intialize counter
        count = 0
        # arrange buttons with grid manager
        for row in range(1,5):
            for column in range(4):
                #button = Button(self.master, command=self.click,width)
                buttons[count].grid(row=row,column=column)
                count += 1
        # arrange last button '=' at the bottom
        buttons[16].grid(row=5,column=0,columnspan=4)

        
    
    def createButton(self,val,write=True,width=7):
        # this function creates a button, and takes one compulsory argument, the value that should be on the button

        return Button(self.master, text=val,command = lambda: self.click(val,write), width=width)   


    def click(self,text,write):
        # this function handles what happens when you click a button
        # 'write' argument if True means the value 'val' should be written on screen, if None, should not be written on screen
        if write == None:

            #only evaluate code when there is an equation to be evaluated
            if text == '=' and self.equation: 
                # replace the unicode value of division ./.with python division symbol / using regex
                self.equation= re.sub(u"\u00F7", '/', self.equation)
                print(self.equation)
                answer = str(eval(self.equation))
                self.clear_screen()
                self.insert_screen(answer,newline=True)
            elif text == u"\u232B":
                self.clear_screen()
            
            
        else:
            # add text to screen
            self.insert_screen(text)
        

    def clear_screen(self):
        #to clear screen
        #set equation to empty before deleting screen
        self.equation = ''
        self.screen.configure(state='normal')
        self.screen.delete('1.0', END)

    def insert_screen(self, value,newline=False):
        self.screen.configure(state='normal')
        self.screen.insert(END,value)
        # record every value inserted in screen
        self.equation += str(value)
        self.screen.configure(state ='disabled')


root = Tk()
my_gui = Calculator(root)
root.mainloop()


''' 
