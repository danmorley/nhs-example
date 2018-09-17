from django import forms
from django.http import HttpResponseRedirect
from django.shortcuts import render
from wagtail.admin.utils import user_passes_test, user_has_any_page_permission

import pandas as pd

from .models import ActionShelf


class PopulateActionForm(forms.Form):
    action_spreadsheet = forms.FileField()


# urgh...
key_translations = {
    'ActionId': 'paragon_id',
    'ActionActive': 'active',
    'ActionButton2Text': 'cta2_text',
    'ActionCategory': "category",
    'ActionCTAType': "cta_type",
    'ActionTextBody': "rich_text_body",
    'ActionButton1Link': "cta1_link",
    'ActionCode': "paragon_action_code",
    'ActionTitle': 'title',
    'ActionButton1Text': "cta1_text",
    'ActionPosition': "position",
    'ActionAppStoreLink': "cta_appstore",
    'ActionGooglePlayLink': "cta_googleplay",
    'ActionButton2Link': "cta2_link",
}


@user_passes_test(user_has_any_page_permission)
def upload_actions(request):
    if request.method == 'POST':
        form = PopulateActionForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['action_spreadsheet']
            df = pd.read_excel(file)
            expected_keys = {'ActionId', 'ActionActive', 'ActionButton2Text', 'ActionCategory', 'ActionCTAType',
                             'ActionTextBody', 'ActionButton1Link', 'ActionCode', 'ActionTitle', 'ActionButton1Text',
                             'ActionPosition', 'ActionAppStoreLink', 'ActionGooglePlayLink', 'ActionButton2Link'}
            if set(df.keys()) != expected_keys:
                raise KeyError("Spreadsheet of Actions is in incorrect format")
            df = df.rename(index=str, columns=key_translations)
            for index, row in df.iterrows():
                row_dict = row.to_dict()
                keys_to_delete = []
                for key, value in row_dict.items():
                    if pd.isna(value):
                        keys_to_delete.append(key)
                for key in keys_to_delete:
                    del row_dict[key]

                print(row_dict)
                try:
                    action_shelf = ActionShelf.objects.get(paragon_id=row_dict['paragon_id'])
                    action_shelf.save(update_fields=row_dict)
                except ActionShelf.DoesNotExist:
                    action_shelf = ActionShelf(**row_dict)
                    action_shelf.save()


                #action, created = ActionShelf.objects.get_or_create(**row_dict)

            return
            #return HttpResponseRedirect('/success/url/')
    else:
        form = PopulateActionForm()
    return render(request, 'action_upload.html', {'form': form})