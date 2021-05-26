import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import (
    AsyncWebsocketConsumer, WebsocketConsumer
)
from pprint import pprint


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        print("Connected")

        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        pprint(self.scope['user']._wrapped)
        self.accept()

    def disconnect(self, close_code):
        print("Disconnected")

        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    def receive(self, text_data):

        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    # Receive message from room group
    def chat_message(self, event):

        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
#
# class ChatConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         print("Connected")
#         self.room_name = self.scope['url_route']['kwargs']['room_name']
#         self.room_group_name = 'chat_%s' % self.room_name
#         pprint(self.scope)
#         # Join room group
#         await self.channel_layer.group_add(
#             self.room_group_name,
#             self.channel_name
#         )
#
#         await self.accept()
#
#     async def disconnect(self, close_code):
#         print("Disconnected")
#         # Leave room group
#         await self.channel_layer.group_discard(
#             self.room_group_name,
#             self.channel_name
#         )
#
#     # Receive message from WebSocket
#     async def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json['message']
#
#         # Send message to room group
#         await self.channel_layer.group_send(
#             self.room_group_name,
#             {
#                 'type': 'chat_message',
#                 'message': message
#             }
#         )
#
#     # Receive message from room group
#     async def chat_message(self, event):
#
#         message = event['message']
#
#         # Send message to WebSocket
#         await self.send(text_data=json.dumps({
#             'message': message
#         }))


#
# class ChatConsumer(WebsocketConsumer):
#     def connect(self):
#         print("connected")
#
#         self.accept()
#
#     def disconnect(self, close_code):
#         pass
#
#     def receive(self, text_data):
#         text_data_json = json.loads(text_data)
#         message = text_data_json['message']
#         self.send(text_data=json.dumps({
#             'message': message
#         }))
