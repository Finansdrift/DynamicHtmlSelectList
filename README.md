# Html select list with dynamic option input support
## Web component not in a shaddow DOM
This is a custom HTML component (a web component) that will allow for dynamic addition of options in the select list. 
Usage: 
``` <select is="sel-el" name="yourown" id="yourown" class="your class names" ></select> 
Or if used in a Razor view, you can even add data using the asp-items attribute, like this:
Usage: <select is="sel-el" name="yourown" id="yourown" class="your class names" asp-items="someobject"></select> 
