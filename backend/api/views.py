from django.test import TestCase
from django.http import JsonResponse


def getRoutes(request):
    return JsonResponse('our aps', safe=False)
