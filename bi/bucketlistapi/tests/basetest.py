from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token


from bi.bucketlistapi.models import BucketList, Item


class BaseTest(APITestCase):

    def setUp(self):
        # Create user migwi
        user_migwi = User.objects.create_user(
            username='andela-dmigwi', password='1234')

        # create user njirap
        user_njirap = User.objects.create_user(
            username='andela-njirap', password='1234')

        # create bucketlist1
        bucklist1 = BucketList.objects.create(name='Visit Mt Kilamanjaro',
                                              created_by=user_migwi)

        # create second bucketlist
        BucketList.objects.create(name='December Vacation',
                                  created_by=user_njirap)

        Item.objects.create(name='carry a bag pack', bucketlist=bucklist1)
        Item.objects.create(name='Trek for 2km', bucketlist=bucklist1)
        Item.objects.create(name='Camp at ngorongoro hotel',
                            bucketlist=bucklist1)
        Item.objects.create(name='Watch the stars at the night',
                            bucketlist=bucklist1)

        # Obtain the token and assign it to the auth_head variable
        token = Token.objects.create(user=user_migwi)
        self.auth_head = {'Authorization': 'Bearer {}'.format(token)}
        # self.client.credentials(HTTP_AUTHOSI)
