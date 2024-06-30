from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput

class MyApp(App):
    def build(self):
        self.box = BoxLayout(orientation='vertical')
        
        self.greeting_label = Label(text="Click the button to enter your name")
        self.box.add_widget(self.greeting_label)
        
        self.enter_name_button = Button(text="Enter Name")
        self.enter_name_button.bind(on_press=self.show_text_input)
        self.box.add_widget(self.enter_name_button)
        
        self.name_input = TextInput(hint_text="Enter your name", multiline=False)
        self.name_input_button = Button(text="Submit")
        self.name_input_button.bind(on_press=self.say_welcome)
        
        return self.box
    
    def show_text_input(self, instance):
        self.box.remove_widget(self.enter_name_button)
        self.box.add_widget(self.name_input)
        self.box.add_widget(self.name_input_button)
        
    def say_welcome(self, instance):
        name = self.name_input.text
        self.greeting_label.text = f"Welcome, {name}!"
        self.box.remove_widget(self.name_input)
        self.box.remove_widget(self.name_input_button)

if __name__ == '__main__':
    MyApp().run()
