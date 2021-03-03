In order to provide good accessibility on all components, some descriptive texts need to be specified directly in the Design System. 

## Get current and available locales

```
<mks-lang-picker :langs="$MKSlocales" :active="$MKScurrentLocale"></mks-lang-picker>
```
<mks-lang-picker :langs="$MKSlocales" :active="$MKScurrentLocale"></mks-lang-picker>


## Use in a component

All the current locale strings exist on the object <code>this.$MKSlocale</code>. 

```
this.$MKSlocale['loading']; 
```
will display <mks-text weight="bold">{{ $MKSlocale['loading'] }}</mks-text>


## Use a different locale

By default, the locale is set to <code>fr</code>. 

Set to another existing locale by using : 
```
this.$MKSsetLocale('en');
this.$MKSlocale['loading']; 
```
will display <mks-text weight="bold">{{ $MKSallLocales['en']['loading'] }}</mks-text>

## Add a new locale

Your app needs to use an unavailable locale ? No problem !  

Add it as follows :
```
this.$MKSaddLocale('it', {
  loading: 'Caricamento...',
  // etc.
});

// Now you can use it 
this.$MKSsetLocale('it');
this.$MKSlocale['loading']; 
```
will display <mks-text weight="bold">Caricamento...</mks-text>